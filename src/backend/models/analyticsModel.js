// src/backend/models/analyticsModel.js
const mongoose = require('mongoose');

// Define the analytics schema
const analyticsSchema = new mongoose.Schema({
    totalUsers: { 
        type: Number, 
        required: true 
    },
    totalPayments: { 
        type: Number, 
        required: true 
    },
    totalPaymentAmount: { 
        type: Number, 
        required: true 
    },
    totalCharities: { 
        type: Number, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Method to update analytics data
analyticsSchema.methods.updateAnalytics = function(data) {
    this.totalUsers = data.totalUsers || this.totalUsers;
    this.totalPayments = data.totalPayments || this.totalPayments;
    this.totalPaymentAmount = data.totalPaymentAmount || this.totalPaymentAmount;
    this.totalCharities = data.totalCharities || this.totalCharities;
    return this.save();
};

// Export the Analytics model
module.exports = mongoose.model('Analytics', analyticsSchema);
