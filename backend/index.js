import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDatabase from './config/database.js';
import routes from './routes/index.js';
import { memoryOptimization, memoryMonitor } from './middlewares/memoryOptimization.js';

const app = express();
const PORT = process.env.PORT || 4567;

// Security middlewares (Node.js 20 optimized)
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API
  crossOriginEmbedderPolicy: false
}));

// Compression middleware for better performance
app.use(compression({
  level: 6, // Balanced compression
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Memory optimization middlewares
app.use(memoryMonitor);
app.use(memoryOptimization);

// Basic middlewares with size limits
app.use(express.json({ limit: '1mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Routes
app.use('/', routes);

// Memory monitoring function
const logMemoryUsage = () => {
    const usage = process.memoryUsage()
    const mbUsed = Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100
    const mbTotal = Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100
    console.log(`📊 Memory: ${mbUsed}MB used / ${mbTotal}MB total`)
}

// Start server
const startServer = async () => {
    try {
        await connectDatabase()
        
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`)
            logMemoryUsage()
        })
        
        // Set server timeout to prevent hanging connections
        server.timeout = 30000 // 30 seconds
        
        // Log memory usage every 5 minutes in production
        if (process.env.NODE_ENV === 'production') {
            setInterval(logMemoryUsage, 5 * 60 * 1000)
        }
        
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🛑 SIGTERM received, shutting down gracefully')
            server.close(() => {
                console.log('✅ Process terminated')
                process.exit(0)
            })
        })
        
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
