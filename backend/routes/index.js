const express = require('express')
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')

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

module.exports = router
