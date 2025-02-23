// eventRoutes.js

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateEventInput, validateRegistrationInput } = require('../middleware/inputValidationMiddleware');

// Route to create a new event
router.post('/events', authMiddleware, validateEventInput, async (req, res) => {
    try {
        await EventController.createEvent(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating event' });
    }
});

// Route to get all events
router.get('/events', authMiddleware, async (req, res) => {
    try {
        await EventController.getAllEvents(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching events' });
    }
});

// Route to get a single event by ID
router.get('/events/:eventId', authMiddleware, async (req, res) => {
    try {
        await EventController.getEventById(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching event' });
    }
});

// Route to register for an event
router.post('/events/:eventId/register', authMiddleware, validateRegistrationInput, async (req, res) => {
    try {
        await EventController.registerForEvent(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering for event' });
    }
});

// Route to get registrations for a specific event
router.get('/events/:eventId/registrations', authMiddleware, async (req, res) => {
    try {
        await EventController.getEventRegistrations(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching event registrations' });
    }
});

// Route to cancel registration for an event
router.delete('/events/:eventId/register', authMiddleware, async (req, res) => {
    try {
        await EventController.cancelRegistration(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error canceling registration' });
    }
});

module.exports = router;
