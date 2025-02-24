// eventController.test.js

const eventController = require('./eventController'); // Import the event controller
const { EventModel } = require('../models/eventModel'); // Mock Event model
const { RegistrationModel } = require('../models/registrationModel'); // Mock Registration model

// Mocking the EventModel and RegistrationModel
jest.mock('../models/eventModel');
jest.mock('../models/registrationModel');

describe('Event Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('createEvent', () => {
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
            const result = await eventController.createEvent(userId, title, description, date, location, capacity);

            // Assert
            expect(EventModel).toHaveBeenCalledWith({
                userId,
                title,
                description,
                date,
                location,
                capacity,
                createdAt: expect.any(Date),
            });
            expect(result).toEqual(mockEvent);
        });
    });

    describe('getAllEvents', () => {
        it('should return all events', async () => {
            // Arrange
            const mockEvents = [{ _id: 'event1' }, { _id: 'event2' }];
            EventModel.find.mockResolvedValue(mockEvents);

            // Act
            const events = await eventController.getAllEvents();

            // Assert
            expect(events).toEqual(mockEvents);
            expect(EventModel.find).toHaveBeenCalled();
        });
    });

    describe('getEventById', () => {
        it('should return an event by ID', async () => {
            // Arrange
            const eventId = 'event123';
            const mockEvent = { _id: eventId, title: 'Event Title', description: 'Event Description' };
            EventModel.findById.mockResolvedValue(mockEvent);

            // Act
            const event = await eventController.getEventById(eventId);

            // Assert
            expect(event).toEqual(mockEvent);
            expect(EventModel.findById).toHaveBeenCalledWith(eventId);
        });

        it('should throw an error if the event is not found', async () => {
            // Arrange
            const eventId = 'event123';
            EventModel.findById.mockResolvedValue(null); // Simulate event not found

            // Act & Assert
            await expect(eventController.getEventById(eventId)).rejects.toThrow('Event not found');
        });
    });

    describe('registerForEvent', () => {
        it('should register a user for an event successfully', async () => {
            // Arrange
            const userId = 'user123';
            const eventId = 'event123';
            const mockEvent = { _id: eventId, capacity: 10 };
            EventModel.findById.mockResolvedValue(mockEvent);
            const mockRegistration = { userId, eventId, _id: 'registration123' };
            RegistrationModel.prototype.save = jest.fn().mockResolvedValue(mockRegistration);

            // Act
            const result = await eventController.registerForEvent(userId, eventId);

            // Assert
            expect(RegistrationModel).toHaveBeenCalledWith({
                userId,
                eventId,
            });
            expect(result).toEqual(mockRegistration);
            expect(mockEvent.capacity).toBe(9); // Capacity should decrease
        });

        it('should throw an error if the event is fully booked', async () => {
            // Arrange
            const userId = 'user123';
            const eventId = 'event123';
            const mockEvent = { _id: eventId, capacity: 0 }; // No capacity left
            EventModel.findById.mockResolvedValue(mockEvent);

            // Act & Assert
            await expect(eventController.registerForEvent(userId, eventId)).rejects.toThrow('Event is fully booked');
        });
    });

    describe('cancelRegistration', () => {
        it('should cancel a user registration successfully', async () => {
            // Arrange
            const userId = 'user123';
            const eventId = 'event123';
            const mockRegistration = { _id: 'registration123' };
            RegistrationModel.findOneAndDelete.mockResolvedValue(mockRegistration);
            const mockEvent = { _id: eventId, capacity: 9 };
            EventModel.findById.mockResolvedValue(mockEvent);
            EventModel.prototype.save = jest.fn().mockResolvedValue({ ...mockEvent, capacity: 10 }); // Increase capacity

            // Act
            const result = await eventController.cancelRegistration(userId, eventId);

            // Assert
            expect(result).toEqual({ message: 'Registration canceled successfully' });
            expect(mockEvent.capacity).toBe(10); // Capacity should increase
        });

        it('should throw an error if the registration is not found', async () => {
            // Arrange
            const userId = 'user123';
            const eventId = 'event123';
            RegistrationModel.findOneAndDelete.mockResolvedValue(null); // Simulate registration not found

            // Act & Assert
            await expect(eventController.cancelRegistration(userId, eventId)).rejects.toThrow('Registration not found');
        });
    });

    describe('deleteEvent', () => {
        it('should delete an event successfully', async () => {
            // Arrange
            const eventId = 'event123';
            const userId = 'user123';
            const mockEvent = { _id: eventId, userId: userId };
            EventModel.findById.mockResolvedValue(mockEvent);
            EventModel.findByIdAndDelete.mockResolvedValue(mockEvent);

            // Act
            const result = await eventController.deleteEvent(eventId, userId);

            // Assert
            expect(result).toEqual({ message: 'Event deleted successfully' });
        });

        it('should throw an error if the event is not found', async () => {
            // Arrange
            const eventId = 'event123';
            const userId = 'user123';
            EventModel.findById.mockResolvedValue(null); // Simulate event not found

            // Act & Assert
            await expect(eventController.deleteEvent(eventId, userId)).rejects.toThrow('Event not found');
        });

        it('should throw an error if the user is not authorized to delete the event', async () => {
            // Arrange
            const eventId = 'event123';
            const userId = 'user123';
            const mockEvent = { _id: eventId, userId: 'otherUser ' }; // Different user
            EventModel.findById.mockResolvedValue(mockEvent);

            // Act & Assert
            await expect(eventController.deleteEvent(eventId, userId)).rejects.toThrow('You are not authorized to delete this event');
        });
    });
});
