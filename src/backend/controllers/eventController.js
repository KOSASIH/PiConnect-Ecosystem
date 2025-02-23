// eventController.js

const EventService = require('../services/eventService');
const { validateEventInput, validateRegistrationInput } = require('../middleware/inputValidationMiddleware');

// Event Controller for handling events and webinars

class EventController {
    // Create a new event
    async createEvent(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { title, description, date, location, capacity } = req.body;
            validateEventInput(req.body); // Validate input

            const newEvent = await EventService.createEvent(userId, title, description, date, location, capacity);
            return res.status(201).json({ success: true, event: newEvent });
        } catch (error) {
            console.error('Error creating event:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get all events
    async getAllEvents(req, res) {
        try {
            const events = await EventService.getAllEvents();
            return res.status(200).json({ success: true, events });
        } catch (error) {
            console.error('Error fetching events:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get a single event by ID
    async getEventById(req, res) {
        try {
            const { eventId } = req.params;
            const event = await EventService.getEventById(eventId);
            if (!event) {
                return res.status(404).json({ success: false, message: 'Event not found' });
            }
            return res.status(200).json({ success: true, event });
        } catch (error) {
            console.error('Error fetching event:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Register for an event
    async registerForEvent(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { eventId } = req.body;
            validateRegistrationInput(req.body); // Validate input

            const registration = await EventService.registerForEvent(userId, eventId);
            return res.status(201).json({ success: true, registration });
        } catch (error) {
            console.error('Error registering for event:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get registrations for an event
    async getEventRegistrations(req, res) {
        try {
            const { eventId } = req.params;
            const registrations = await EventService.getEventRegistrations(eventId);
            return res.status(200).json({ success: true, registrations });
        } catch (error) {
            console.error('Error fetching event registrations:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Cancel registration for an event
    async cancelRegistration(req, res) {
        try {
            const { userId } = req.user; // Assuming user ID is available in the request
            const { eventId } = req.body;

            const result = await EventService.cancelRegistration(userId, eventId);
            return res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Error canceling registration:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

module.exports = new EventController();
