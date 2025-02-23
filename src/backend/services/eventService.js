// eventService.js

const EventModel = require('../models/eventModel'); // Assuming eventModel contains the Event schema
const RegistrationModel = require('../models/registrationModel'); // Assuming a separate Registration model exists
const UserModel = require('../models/userModel'); // Assuming a User model exists

class EventService {
    // Create a new event
    async createEvent(userId, title, description, date, location, capacity) {
        const newEvent = new EventModel({
            userId,
            title,
            description,
            date,
            location,
            capacity,
        });
        await newEvent.save();
        return newEvent;
    }

    // Get all events
    async getAllEvents() {
        return await EventModel.find()
            .populate('userId', 'username') // Populate user details
            .sort({ date: 1 }); // Sort by event date
    }

    // Get a single event by ID
    async getEventById(eventId) {
        const event = await EventModel.findById(eventId).populate('userId', 'username');
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    }

    // Register for an event
    async registerForEvent(userId, eventId) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.capacity <= 0) {
            throw new Error('Event is fully booked');
        }

        const registration = new RegistrationModel({
            userId,
            eventId,
        });
        await registration.save();

        // Decrease the event capacity
        event.capacity -= 1;
        await event.save();

        return registration;
    }

    // Get registrations for a specific event
    async getEventRegistrations(eventId) {
        return await RegistrationModel.find({ eventId })
            .populate('userId', 'username') // Populate user details
            .sort({ createdAt: -1 }); // Sort by registration date
    }

    // Cancel registration for an event
    async cancelRegistration(userId, eventId) {
        const registration = await RegistrationModel.findOneAndDelete({ userId, eventId });
        if (!registration) {
            throw new Error('Registration not found');
        }

        // Increase the event capacity
        const event = await EventModel.findById(eventId);
        event.capacity += 1;
        await event.save();

        return { message: 'Registration canceled successfully' };
    }
}

module.exports = new EventService();
