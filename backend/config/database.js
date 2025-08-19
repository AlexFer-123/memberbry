import 'dotenv/config';
import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const dbUser = process.env.DB_USER
        const dbPass = process.env.DB_PASS
        const dbUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.spki4nd.mongodb.net/`
        
        // Optimized connection options for low memory usage
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 5, // Limit connection pool size
            minPoolSize: 1,
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
            heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds
        }
        
        await mongoose.connect(dbUrl, options)
        
        // Optimize mongoose settings for memory
        mongoose.set('strictQuery', true)
        
        console.log('✅ Database connected successfully with optimized settings')
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        process.exit(1)
    }
}

export default connectDatabase;
