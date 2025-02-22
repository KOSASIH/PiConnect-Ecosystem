// src/backend/config.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection function
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI; // MongoDB URI from environment variables
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // Ensure indexes are created
            useFindAndModify: false // Avoid deprecation warnings
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connectDB function
module.exports = { connectDB };
