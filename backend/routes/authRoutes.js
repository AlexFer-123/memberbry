import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router()

// @route   POST /auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register)

// @route   POST /auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.login)

export default router;
