// src/backend/middleware/errorMiddleware.js

// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
    // Log the error for debugging
    console.error('Error:', err);

    // Set the response status code based on the error type
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    const message = err.message || 'Internal Server Error';

    // Send the error response
    res.status(statusCode).send({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = errorMiddleware;
