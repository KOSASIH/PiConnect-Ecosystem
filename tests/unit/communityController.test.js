// communityController.test.js

const communityController = require('./communityController'); // Import the community controller
const { PostModel } = require('../models/postModel'); // Mock Post model
const { CommentModel } = require('../models/commentModel'); // Mock Comment model

// Mocking the PostModel and CommentModel
jest.mock('../models/postModel');
jest.mock('../models/commentModel');

describe('Community Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('createPost', () => {
        it('should create a new post successfully', async () => {
            // Arrange
            const userId = 'user123';
            const title = 'New Post Title';
            const content = 'This is the content of the post.';
            const mockPost = { userId, title, content, _id: 'post123' };
            PostModel.prototype.save = jest.fn().mockResolvedValue(mockPost);

            // Act
            const result = await communityController.createPost(userId, title, content);

            // Assert
            expect(PostModel).toHaveBeenCalledWith({
                userId,
                title,
                content,
                createdAt: expect.any(Date),
                likes: [],
            });
            expect(result).toEqual(mockPost);
        });
    });

    describe('getAllPosts', () => {
        it('should return all posts', async () => {
            // Arrange
            const mockPosts = [{ _id: 'post1' }, { _id: 'post2' }];
            PostModel.find.mockResolvedValue(mockPosts);

            // Act
            const posts = await communityController.getAllPosts();

            // Assert
            expect(posts).toEqual(mockPosts);
            expect(PostModel.find).toHaveBeenCalled();
        });
    });

    describe('getPostById', () => {
        it('should return a post by ID', async () => {
            // Arrange
            const postId = 'post123';
            const mockPost = { _id: postId, title: 'Post Title', content: 'Post Content' };
            PostModel.findById.mockResolvedValue(mockPost);

            // Act
            const post = await communityController.getPostById(postId);

            // Assert
            expect(post).toEqual(mockPost);
            expect(PostModel.findById).toHaveBeenCalledWith(postId);
        });

        it('should throw an error if the post is not found', async () => {
            // Arrange
            const postId = 'post123';
            PostModel.findById.mockResolvedValue(null); // Simulate post not found

            // Act & Assert
            await expect(communityController.getPostById(postId)).rejects.toThrow('Post not found');
        });
    });

    describe('createComment', () => {
        it('should create a new comment successfully', async () => {
            // Arrange
            const userId = 'user123';
            const postId = 'post123';
            const content = 'This is a comment.';
            const mockComment = { userId, postId, content, _id: 'comment123' };
            CommentModel.prototype.save = jest.fn().mockResolvedValue(mockComment);

            // Act
            const result = await communityController.createComment(userId, postId, content);

            // Assert
            expect(CommentModel).toHaveBeenCalledWith({
                userId,
                postId,
                content,
                createdAt: expect.any(Date),
            });
            expect(result).toEqual(mockComment);
        });
    });

    describe('getCommentsForPost', () => {
        it('should return comments for a specific post', async () => {
            // Arrange
            const postId = 'post123';
            const mockComments = [{ _id: 'comment1' }, { _id: 'comment2' }];
            CommentModel.find.mockResolvedValue(mockComments);

            // Act
            const comments = await communityController.getCommentsForPost(postId);

            // Assert
            expect(comments).toEqual(mockComments);
            expect(CommentModel.find).toHaveBeenCalledWith({ postId });
        });
    });

    describe('likePost', () => {
        it('should like a post if not already liked', async () => {
            // Arrange
            const userId = 'user123';
            const postId = 'post123';
            const mockPost = { _id: postId, likes: [] };
            PostModel.findById.mockResolvedValue(mockPost);
            PostModel.prototype.save = jest.fn().mockResolvedValue(mockPost);

            // Act
            const result = await communityController.likePost(userId, postId);

            // Assert
            expect(mockPost.likes).toContain(userId);
            expect(PostModel.prototype.save).toHaveBeenCalled();
            expect(result).toEqual({ message: 'Post liked successfully' });
        });

        it('should not like a post if already liked', async () => {
            // Arrange
            const userId = 'user123';
            const postId = 'post123';
            const mockPost = { _id: postId, likes: [userId] };
            PostModel.findById.mockResolvedValue(mockPost);

            // Act
            const result = await communityController.likePost(userId, postId);

            // Assert
            expect(result).toEqual({ message: 'Post already liked' });
        });
    });
});
