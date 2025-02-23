// src/tests/integration/notificationRoutes.test.js

const request = require('supertest');
const app = require('../../backend/app'); // Import your Express app

describe('Notification Routes', () => {
    it('should send a notification successfully', async () => {
        const response = await request(app)
            .post('/api/notifications')
            .send({
                userId: 'user123',
                message: 'New donation received!',
            });

        expect(response.status).toBe(201);
        expect(response.body.notification).toEqual({
            id: expect.any(String),
            message: 'New donation received!',
            read: false,
            date: expect.any(String),
        });
    });

    it('should return an error for missing message', async () => {
        const response = await request(app)
            .post('/api/notifications')
            .send({
                userId: 'user123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'Notification message is required',
        });
    });
});
