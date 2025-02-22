// src/backend/models/notificationModel.js
const mongoose = require('mongoose');

// Define the notification schema
const notificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User ', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    }
});

// Method to mark notification as read
notificationSchema.methods.markAsRead = function() {
    this.isRead = true;
    return this.save();
};

// Export the Notification model
module.exports = mongoose.model('Notification', notificationSchema);
