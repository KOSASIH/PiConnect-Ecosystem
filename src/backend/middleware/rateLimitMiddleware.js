// src/backend/middleware/rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

// Create a rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 'error',
        message: 'Too many requests, please try again later.',
    },
});

// Export the rate limiting middleware
module.exports = limiter;
