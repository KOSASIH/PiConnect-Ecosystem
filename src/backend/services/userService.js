// src/backend/services/userService.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser  = async (username, password, email) => {
    // Validate input
    if (!username || !password || !email) {
        throw new Error('Username, password, and email are required.');
    }

    // Check if the username or email already exists
    const existingUser  = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser ) {
        throw new Error('Username or email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser  = new User({
        username,
        password: hashedPassword,
        email,
    });

    // Save the user to the database
    await newUser .save();

    return newUser ;
};

// Log in a user
const loginUser  = async (username, password) => {
    // Validate input
    if (!username || !password) {
        throw new Error('Username and password are required.');
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password.');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid username or password.');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

// Get user information by user ID
const getUser Info = async (userId) => {
    // Validate input
    if (!userId) {
        throw new Error('User  ID is required.');
    }

    // Retrieve the user by ID, excluding the password
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User  not found.');
    }

    return user;
};

// Export the user service functions
module.exports = {
    registerUser ,
    loginUser ,
    getUser Info,
};
