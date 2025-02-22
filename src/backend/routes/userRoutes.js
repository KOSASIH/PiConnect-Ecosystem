// src/backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to register a new user
router.post('/register', userController.registerUser );

// Route to log in a user
router.post('/login', userController.loginUser );

// Route to get user information by user ID
router.get('/:userId', userController.getUser Info);

// Export the user routes
module.exports = router;
