// src/backend/utils/logger.js
const fs = require('fs');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, 'application.log');

// Function to log messages
const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}\n`;

    // Append the log entry to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

// Function to log errors
const logError = (error) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ERROR: ${error}\n`;

    // Append the error entry to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

// Export the logging functions
module.exports = {
    logMessage,
    logError,
};
