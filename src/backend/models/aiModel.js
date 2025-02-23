// aiModel.js

const mongoose = require('mongoose');

// Define the schema for AI recommendations
const aiSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to the User model
        required: true,
    },
    preferences: {
        type: Map,
        of: String, // Key-value pairs for user preferences (e.g., category: 'sports', genre: 'action')
    },
    interactionHistory: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item', // Reference to the Item model (could be products, articles, etc.)
                required: true,
            },
            interactionType: {
                type: String,
                enum: ['viewed', 'liked', 'shared', 'commented'], // Types of interactions
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now, // Timestamp of the interaction
            },
        },
    ],
    recommendations: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item', // Reference to the Item model
                required: true,
            },
            score: {
                type: Number,
                required: true, // Score indicating the strength of the recommendation
            },
            createdAt: {
                type: Date,
                default: Date.now, // Timestamp of when the recommendation was generated
            },
        },
    ],
});

// Create the AI model
const AIModel = mongoose.model('AI', aiSchema);

module.exports = AIModel;
