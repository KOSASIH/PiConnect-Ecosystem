// fraudModel.js

const mongoose = require('mongoose');

// Define the schema for fraud detection data
const fraudSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction', // Reference to the Transaction model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to the User model
        required: true,
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to the User model who reported the fraud
        required: true,
    },
    reason: {
        type: String,
        required: true, // Reason for reporting the fraud
    },
    status: {
        type: String,
        enum: ['pending', 'investigating', 'resolved', 'dismissed'], // Status of the fraud report
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now, // Timestamp of when the fraud report was created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Timestamp of the last update to the fraud report
    },
    fraudScore: {
        type: Number,
        default: 0, // Score indicating the likelihood of fraud (can be calculated based on various factors)
    },
    additionalInfo: {
        type: Map,
        of: String, // Additional information related to the fraud case (e.g., IP address, device info)
    },
});

// Create the Fraud model
const FraudModel = mongoose.model('Fraud', fraudSchema);

module.exports = FraudModel;
