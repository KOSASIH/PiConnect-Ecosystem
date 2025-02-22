// src/backend/models/charityModel.js
const mongoose = require('mongoose');

// Define the charity schema
const charitySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    totalDonations: { 
        type: Number, 
        default: 0 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
});

// Method to update total donations
charitySchema.methods.updateTotalDonations = function(amount) {
    this.totalDonations += amount;
    return this.save();
};

// Export the Charity model
module.exports = mongoose.model('Charity', charitySchema);
