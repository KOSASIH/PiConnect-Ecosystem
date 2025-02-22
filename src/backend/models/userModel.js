// src/backend/models/userModel.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    lastLogin: { 
        type: Date 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
});

// Method to update the last login time
userSchema.methods.updateLastLogin = function() {
    this.lastLogin = Date.now();
    return this.save();
};

// Export the User model
module.exports = mongoose.model('User ', userSchema);
