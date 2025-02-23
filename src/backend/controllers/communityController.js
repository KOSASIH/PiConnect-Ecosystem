// communityController.js

const CommunityService = require('../services/communityService');
const { validatePostInput, validateCommentInput } = require('../middleware/inputValidationMiddleware');

// Community Controller for handling community engagement features

class CommunityController {
    // Create a new post
    async createPost(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { content, title } = req.body;
            validatePostInput(req.body); // Validate input

            const newPost = await CommunityService.createPost(userId, title, content);
            return res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get all posts
    async getAllPosts(req, res) {
        try {
            const posts = await CommunityService.getAllPosts();
            return res.status(200).json({ success: true, posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get a single post by ID
    async getPostById(req, res) {
        try {
            const { postId } = req.params;
            const post = await CommunityService.getPostById(postId);
            if (!post) {
                return res.status(404).json({ success: false, message: 'Post not found' });
            }
            return res.status(200).json({ success: true, post });
        } catch (error) {
            console.error('Error fetching post:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Create a comment on a post
    async createComment(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { postId, content } = req.body;
            validateCommentInput(req.body); // Validate input

            const newComment = await CommunityService.createComment(userId, postId, content);
            return res.status(201).json({ success: true, comment: newComment });
        } catch (error) {
            console.error('Error creating comment:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get comments for a specific post
    async getCommentsForPost(req, res) {
        try {
            const { postId } = req.params;
            const comments = await CommunityService.getCommentsForPost(postId);
            return res.status(200).json({ success: true, comments });
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Like a post
    async likePost(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { postId } = req.body;

            const result = await CommunityService.likePost(userId, postId);
            return res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Error liking post:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Dislike a post
    async dislikePost(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { postId } = req.body;

            const result = await CommunityService.dislikePost(userId, postId);
            return res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Error disliking post:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

module.exports = new CommunityController();
