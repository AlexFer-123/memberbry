require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDatabase = require('./config/database')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 4567

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/', routes)

// Start server
const startServer = async () => {
    try {
        await connectDatabase()
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
