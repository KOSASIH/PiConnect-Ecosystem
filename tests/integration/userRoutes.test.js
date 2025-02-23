// tests/integration/userRoutes.test.js

const request = require('supertest');
const app = require('../../backend/app'); // Import your Express app

describe('User  Routes', () => {
    it('should register a new user successfully', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
            });

        expect(response.status).toBe(201);
        expect(response.body.user).toEqual({
            id: expect.any(String),
            username: 'testuser',
            email: 'test@example.com',
        });
    });

    it('should return an error for duplicate username', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'existinguser',
                password: 'password123',
                email: 'test@example.com',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'User  already exists',
        });
    });
});
