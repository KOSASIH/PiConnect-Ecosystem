// src/backend/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser  = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    try {
        // Check if the user already exists
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).send({ message: 'Username already taken.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({ username, password: hashedPassword });
        await newUser .save();

        // Respond with success
        res.status(201).send({ message: 'User  registered successfully', user: newUser  });
    } catch (error) {
        console.error('User  registration error:', error);
        res.status(500).send({ message: 'User  registration failed', error });
    }
};

// Login a user
exports.loginUser  = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('User  login error:', error);
        res.status(500).send({ message: 'Login failed', error });
    }
};

// Get user information
exports.getUser Info = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).send({ message: 'User  not found' });
        }

        // Respond with user information
        res.status(200).send(user);
    } catch (error) {
        console.error('Error retrieving user information:', error);
        res.status(500).send({ message: 'Failed to retrieve user information', error });
    }
};
