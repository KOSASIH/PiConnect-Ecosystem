// src/tests/unit/notificationController.test.js

const notificationController = require('../../backend/controllers/notificationController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('Notification Controller', () => {
    it('should send a notification successfully', async () => {
        const req = mockRequest({
            body: {
                userId: 'user123',
                message: 'New donation received!',
            },
        });
        const res = mockResponse();

        await notificationController.sendNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            notification: {
                id: expect.any(String),
                message: 'New donation received!',
                read: false,
                date: expect.any(String),
            },
        });
    });

    it('should return an error for missing message', async () => {
        const req = mockRequest({
            body: {
                userId: 'user123',
            },
        });
        const res = mockResponse();

        await notificationController.sendNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Notification message is required',
        });
    });
});
