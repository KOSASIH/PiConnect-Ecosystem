// communityRoutes.js

const express = require('express');
const router = express.Router();
const CommunityController = require('../controllers/communityController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validatePostInput, validateCommentInput } = require('../middleware/inputValidationMiddleware');

// Route to create a new post
router.post('/posts', authMiddleware, validatePostInput, async (req, res) => {
    try {
        await CommunityController.createPost(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating post' });
    }
});

// Route to get all posts
router.get('/posts', authMiddleware, async (req, res) => {
    try {
        await CommunityController.getAllPosts(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
});

// Route to get a single post by ID
router.get('/posts/:postId', authMiddleware, async (req, res) => {
    try {
        await CommunityController.getPostById(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching post' });
    }
});

// Route to create a comment on a post
router.post('/posts/:postId/comments', authMiddleware, validateCommentInput, async (req, res) => {
    try {
        await CommunityController.createComment(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating comment' });
    }
});

// Route to get comments for a specific post
router.get('/posts/:postId/comments', authMiddleware, async (req, res) => {
    try {
        await CommunityController.getCommentsForPost(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching comments' });
    }
});

// Route to like a post
router.post('/posts/:postId/like', authMiddleware, async (req, res) => {
    try {
        await CommunityController.likePost(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error liking post' });
    }
});

// Route to dislike a post
router.post('/posts/:postId/dislike', authMiddleware, async (req, res) => {
    try {
        await CommunityController.dislikePost(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error disliking post' });
    }
});

module.exports = router;
