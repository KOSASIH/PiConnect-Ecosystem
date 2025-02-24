// communityRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Import your Express app
const { PostModel } = require('../models/postModel'); // Mock Post model
const { CommentModel } = require('../models/commentModel'); // Mock Comment model

// Mocking the PostModel and CommentModel
jest.mock('../models/postModel');
jest.mock('../models/commentModel');

describe('Community Engagement Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('POST /api/posts', () => {
        it('should create a new post successfully', async () => {
            // Arrange
            const userId = 'user123';
            const title = 'New Post Title';
            const content = 'This is the content of the post.';
            const mockPost = { userId, title, content, _id: 'post123' };
            PostModel.prototype.save = jest.fn().mockResolvedValue(mockPost);

            // Act
            const response = await request(app)
                .post('/api/posts')
                .send({ userId, title, content });

            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockPost);
        });
    });

    describe('GET /api/posts', () => {
        it('should return all posts', async () => {
            // Arrange
            const mockPosts = [{ _id: 'post1' }, { _id: 'post2' }];
            PostModel.find.mockResolvedValue(mockPosts);

            // Act
            const response = await request(app)
                .get('/api/posts');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPosts);
        });
    });

    describe('GET /api/posts/:id', () => {
        it('should return a post by ID', async () => {
            // Arrange
            const postId = 'post123';
            const mockPost = { _id: postId, title: 'Post Title', content: 'Post Content' };
            PostModel.findById.mockResolvedValue(mockPost);

            // Act
            const response = await request(app)
                .get(`/api/posts/${postId}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPost);
        });

        it('should return 404 if the post is not found', async () => {
            // Arrange
            const postId = 'post123';
            PostModel.findById.mockResolvedValue(null); // Simulate post not found

            // Act
            const response = await request(app)
                .get(`/api/posts/${postId}`);

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Post not found');
        });
    });

    describe('POST /api/posts/:id/comments', () => {
        it('should create a new comment successfully', async () => {
            // Arrange
            const userId = 'user123';
            const postId = 'post123';
            const content = 'This is a comment.';
            const mockComment = { userId, postId, content, _id: 'comment123' };
            CommentModel.prototype.save = jest.fn().mockResolvedValue(mockComment);

            // Act
            const response = await request(app)
                .post(`/api/posts/${postId}/comments`)
                .send({ userId, content });

            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockComment);
        });
    });

    describe('GET /api/posts/:id/comments', () => {
        it('should return comments for a specific post', async () => {
            // Arrange
            const postId = 'post123';
            const mockComments = [{ _id: 'comment1' }, { _id: 'comment2' }];
            CommentModel.find.mockResolvedValue(mockComments);

            // Act
            const response = await request(app)
                .get(`/api/posts/${postId}/comments`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockComments);
        });
    });

    describe('POST /api/posts/:id/like', () => {
        it('should like a post if not already liked', async () => {
            // Arrange
            const userId = 'user123';
            const postId = 'post123';
            const mockPost = { _id: postId, likes: [] };
            PostModel.findById.mockResolvedValue(mockPost);
            PostModel.prototype.save = jest.fn().mockResolvedValue(mockPost);

            // Act
            const response = await request(app)
                .post(`/api/posts/${postId}/like`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(200);
            expect(mockPost.likes).toContain(userId);
            expect(response.body.message).toBe('Post liked successfully');
        });

        it('should not like a post if already liked', async () => {
            // Arrange
            const userId = 'user123';
            const postId = 'post123';
            const mockPost = { _id: postId, likes: [userId] };
            PostModel.findById.mockResolvedValue(mockPost);

            // Act
            const response = await request(app)
                .post(`/api/posts/${postId}/like`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Post already liked');
        });
    });
});
