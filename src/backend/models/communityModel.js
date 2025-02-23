// communityModel.js

const mongoose = require('mongoose');

// Define the schema for community engagement data
const communitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to the User model
        required: true,
    },
    title: {
        type: String,
        required: true, // Title of the post
        trim: true,
    },
    content: {
        type: String,
        required: true, // Content of the post
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Timestamp of when the post was created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Timestamp of the last update to the post
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User ', // Users who liked the post
        },
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User ', // Reference to the User model who commented
                required: true,
            },
            content: {
                type: String,
                required: true, // Content of the comment
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now, // Timestamp of when the comment was created
            },
        },
    ],
});

// Create the Community model
const CommunityModel = mongoose.model('Community', communitySchema);

module.exports = CommunityModel;
