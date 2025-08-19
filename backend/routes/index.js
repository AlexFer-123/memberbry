import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router()

// Health check route
router.get('/', (req, res) => {
    res.status(200).json({ 
        msg: 'Memberbry API is running!',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    })
})

// Route groups
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router;
