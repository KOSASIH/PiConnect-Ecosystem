// communityService.js

const PostModel = require('../models/communityModel'); // Assuming communityModel contains the Post schema
const CommentModel = require('../models/commentModel'); // Assuming a separate Comment model exists
const UserModel = require('../models/userModel'); // Assuming a User model exists

class CommunityService {
    // Create a new post
    async createPost(userId, title, content) {
        const newPost = new PostModel({
            userId,
            title,
            content,
        });
        await newPost.save();
        return newPost;
    }

    // Get all posts
    async getAllPosts() {
        return await PostModel.find()
            .populate('userId', 'username') // Populate user details
            .sort({ createdAt: -1 }); // Sort by creation date
    }

    // Get a single post by ID
    async getPostById(postId) {
        const post = await PostModel.findById(postId).populate('userId', 'username');
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    }

    // Create a comment on a post
    async createComment(userId, postId, content) {
        const newComment = new CommentModel({
            userId,
            postId,
            content,
        });
        await newComment.save();
        return newComment;
    }

    // Get comments for a specific post
    async getCommentsForPost(postId) {
        return await CommentModel.find({ postId })
            .populate('userId', 'username') // Populate user details
            .sort({ createdAt: -1 }); // Sort by creation date
    }

    // Like a post
    async likePost(userId, postId) {
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (!post.likes.includes(userId)) {
            post.likes.push(userId); // Add user ID to likes
            await post.save();
            return { message: 'Post liked successfully' };
        }
        return { message: 'Post already liked' };
    }

    // Dislike a post
    async dislikePost(userId, postId) {
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString()); // Remove user ID from likes
            await post.save();
            return { message: 'Post disliked successfully' };
        }
        return { message: 'Post not liked yet' };
    }
}

module.exports = new CommunityService();
