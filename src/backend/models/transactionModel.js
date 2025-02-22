// src/backend/models/transactionModel.js
const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User ', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
    },
    description: { 
        type: String 
    }
});

// Method to update the transaction status
transactionSchema.methods.updateStatus = function(newStatus) {
    this.status = newStatus;
    return this.save();
};

// Export the Transaction model
module.exports = mongoose.model('Transaction', transactionSchema);
