// src/tests/unit/userController.test.js

const userController = require('../../backend/controllers/userController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('User Controller', () => {
    it('should register a new user successfully', async () => {
        const req = mockRequest({
            body: {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
            },
        });
        const res = mockResponse();

        await userController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            user: {
                id: expect.any(String),
                username: 'testuser',
                email: 'test@example.com',
            },
        });
    });

    it('should return an error for duplicate username', async () => {
        const req = mockRequest({
            body: {
                username: 'existinguser',
                password: 'password123',
                email: 'test@example.com',
            },
        });
        const res = mockResponse();

        await userController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User already exists',
        });
    });
});
