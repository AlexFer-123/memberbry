const express = require('express')
const userController = require('../controllers/userController')
const { checkToken } = require('../middlewares/auth')

const router = express.Router()

// @route   GET /users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', checkToken, userController.getUser)

// @route   PUT /users/:id/token
// @desc    Update user integration token
// @access  Public (for now, could be private)
router.put('/:id/token', userController.updateIntegrationToken)

// @route   PUT /users/:id/lessons
// @desc    Add lesson to user
// @access  Private
router.put('/:id/lessons', checkToken, userController.addLesson)

module.exports = router
