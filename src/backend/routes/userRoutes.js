// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration route
router.post('/register', userController.registerUser );

// User login route
router.post('/login', userController.loginUser );

module.exports = router;
