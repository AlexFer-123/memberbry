require('dotenv').config()
const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        const dbUser = process.env.DB_USER
        const dbPass = process.env.DB_PASS
        const dbUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.spki4nd.mongodb.net/`
        
        await mongoose.connect(dbUrl, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        
        console.log('✅ Database connected successfully')
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        process.exit(1)
    }
}

module.exports = connectDatabase
