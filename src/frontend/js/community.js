// community.js

const { PostModel } = require('../models/postModel'); // Model for community posts
const { CommentModel } = require('../models/commentModel'); // Model for comments
const { UserModel } = require('../models/userModel'); // Model for users

// Function to create a new post
const createPost = async (userId, title, content) => {
    const newPost = new PostModel({
        userId,
        title,
        content,
        createdAt: new Date(),
        likes: [],
    });
    await newPost.save();
    return newPost;
};

// Function to get all posts
const getAllPosts = async () => {
    return await PostModel.find()
        .populate('userId', 'username') // Populate user details
        .sort({ createdAt: -1 }); // Sort by creation date
};

// Function to get a single post by ID
const getPostById = async (postId) => {
    const post = await PostModel.findById(postId).populate('userId', 'username');
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
};

// Function to create a comment on a post
const createComment = async (userId, postId, content) => {
    const newComment = new CommentModel({
        userId,
        postId,
        content,
        createdAt: new Date(),
    });
    await newComment.save();
    return newComment;
};

// Function to get comments for a specific post
const getCommentsForPost = async (postId) => {
    return await CommentModel.find({ postId })
        .populate('userId', 'username') // Populate user details
        .sort({ createdAt: -1 }); // Sort by creation date
};

// Function to like a post
const likePost = async (userId, postId) => {
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
};

// Function to dislike a post
const dislikePost = async (userId, postId) => {
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
};

// Function to delete a post
const deletePost = async (postId, userId) => {
    const post = await PostModel.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    if (post.userId.toString() !== userId.toString()) {
        throw new Error('You are not authorized to delete this post');
    }
    await PostModel.findByIdAndDelete(postId);
    return { message: 'Post deleted successfully' };
};

// Function to delete a comment
const deleteComment = async (commentId, userId) => {
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.userId.toString() !== userId.toString()) {
        throw new Error('You are not authorized to delete this comment');
    }
    await CommentModel.findByIdAndDelete(commentId);
    return { message: 'Comment deleted successfully' };
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    createComment,
    getCommentsForPost,
    likePost,
    dislikePost,
    deletePost,
    deleteComment,
};
