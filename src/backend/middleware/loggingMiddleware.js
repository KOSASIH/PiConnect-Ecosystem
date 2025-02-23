// loggingMiddleware.js

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Create a write stream (in append mode) for logging to a file
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/requests.log'), { flags: 'a' });

// Setup morgan to log requests to the console and to a file
const requestLogger = morgan('combined', { stream: logStream });

// Middleware function to log requests
const logRequests = (req, res, next) => {
    const { method, url, headers } = req;
    const startTime = Date.now();

    // Log the request details
    console.log(`[${new Date().toISOString()}] ${method} ${url} - Headers: ${JSON.stringify(headers)}`);

    // Listen for the response to log when it's finished
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`[${new Date().toISOString()}] ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next(); // Call the next middleware or route handler
};

// Export the middleware
module.exports = {
    requestLogger,
    logRequests,
};
