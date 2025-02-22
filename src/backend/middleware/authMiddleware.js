// src/backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token is provided
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).send({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
