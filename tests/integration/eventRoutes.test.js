// eventRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Import your Express app
const { EventModel } = require('../models/eventModel'); // Mock Event model
const { RegistrationModel } = require('../models/registrationModel'); // Mock Registration model

// Mocking the EventModel and RegistrationModel
jest.mock('../models/eventModel');
jest.mock('../models/registrationModel');

describe('Event Management Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('POST /api/events', () => {
        it('should create a new event successfully', async () => {
            // Arrange
            const userId = 'user123';
            const title = 'New Event';
            const description = 'This is a new event.';
            const date = new Date();
            const location = 'Online';
            const capacity = 100;
            const mockEvent = { userId, title, description, date, location, capacity, _id: 'event123' };
            EventModel.prototype.save = jest.fn().mockResolvedValue(mockEvent);

            // Act
            const response = await request(app)
                .post('/api/events')
                .send({ userId, title, description, date, location, capacity });

            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockEvent);
        });
    });

    describe('GET /api/events', () => {
        it('should return all events', async () => {
            // Arrange
            const mockEvents = [{ _id: 'event1' }, { _id: 'event2' }];
            EventModel.find.mockResolvedValue(mockEvents);

            // Act
            const response = await request(app)
                .get('/api/events');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockEvents);
        });
    });

    describe('GET /api/events/:id', () => {
        it('should return an event by ID', async () => {
            // Arrange
            const eventId = 'event123';
            const mockEvent = { _id: eventId, title: 'Event Title', description: 'Event Description' };
            EventModel.findById.mockResolvedValue(mockEvent);

            // Act
            const response = await request(app)
                .get(`/api/events/${eventId}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockEvent);
        });

        it('should return 404 if the event is not found', async () => {
            // Arrange
            const eventId = 'event123';
            EventModel.findById.mockResolvedValue(null); // Simulate event not found

            // Act
            const response = await request(app)
                .get(`/api/events/${eventId}`);

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Event not found');
        });
    });

    describe('POST /api/events/:id/register', () => {
        it('should register a user for an event successfully', async () => {
            // Arrange
            const userId = 'user123';
            const eventId = 'event123';
            const mockEvent = { _id: eventId, capacity: 10 };
            EventModel.findById.mockResolvedValue(mockEvent);
            const mockRegistration = { userId, eventId, _id: 'registration123' };
            RegistrationModel.prototype.save = jest.fn().mockResolvedValue(mockRegistration);

            // Act
            const response = await request(app)
                .post(`/api/events/${eventId}/register`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockRegistration);
            expect(mockEvent.capacity).toBe(9); // Capacity should decrease
        });

        it('should return 400 if the event is fully booked', async () => {
            // Arrange
            const userId = 'user123';
            const eventId = 'event123';
            const mockEvent = { _id: eventId, capacity: 0 }; // No capacity left
            EventModel.findById.mockResolvedValue(mockEvent);

            // Act
            const response = await request(app)
                .post(`/api/events/${eventId}/register`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Event is fully booked');
        });
    });

    describe('DELETE /api/events/:id', () => {
        it('should delete an event successfully', async () => {
            // Arrange
            const eventId = 'event123';
            const userId = 'user123';
            const mockEvent = { _id: eventId, userId: userId };
            EventModel.findById.mockResolvedValue(mockEvent);
            EventModel.findByIdAndDelete.mockResolvedValue(mockEvent);

            // Act
            const response = await request(app)
                .delete(`/api/events/${eventId}`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Event deleted successfully');
        });

        it('should return 404 if the event is not found', async () => {
            // Arrange
            const eventId = 'event123';
            const userId = 'user123';
            EventModel.findById.mockResolvedValue(null); // Simulate event not found

            // Act
            const response = await request(app)
                .delete(`/api/events/${eventId}`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Event not found');
        });

        it('should return 403 if the user is not authorized to delete the event', async () => {
            // Arrange
            const eventId = 'event123';
            const userId = 'user123';
            const mockEvent = { _id: eventId, userId: 'otherUser ' }; // Different user
            EventModel.findById.mockResolvedValue(mockEvent);

            // Act
            const response = await request(app)
                .delete(`/api/events/${eventId}`)
                .send({ userId });

            // Assert
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('You are not authorized to delete this event');
        });
    });
});
