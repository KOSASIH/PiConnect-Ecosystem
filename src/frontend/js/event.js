// event.js

const { EventModel } = require('../models/eventModel'); // Model for events
const { RegistrationModel } = require('../models/registrationModel'); // Model for registrations
const { UserModel } = require('../models/userModel'); // Model for users

// Function to create a new event
const createEvent = async (userId, title, description, date, location, capacity) => {
    const newEvent = new EventModel({
        userId,
        title,
        description,
        date,
        location,
        capacity,
        createdAt: new Date(),
    });
    await newEvent.save();
    return newEvent;
};

// Function to get all events
const getAllEvents = async () => {
    return await EventModel.find()
        .populate('userId', 'username') // Populate user details
        .sort({ date: 1 }); // Sort by event date
};

// Function to get a single event by ID
const getEventById = async (eventId) => {
    const event = await EventModel.findById(eventId).populate('userId', 'username');
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

// Function to register for an event
const registerForEvent = async (userId, eventId) => {
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
};

// Function to get registrations for a specific event
const getEventRegistrations = async (eventId) => {
    return await RegistrationModel.find({ eventId })
        .populate('userId', 'username') // Populate user details
        .sort({ createdAt: -1 }); // Sort by registration date
};

// Function to cancel registration for an event
const cancelRegistration = async (userId, eventId) => {
    const registration = await RegistrationModel.findOneAndDelete({ userId, eventId });
    if (!registration) {
        throw new Error('Registration not found');
    }

    // Increase the event capacity
    const event = await EventModel.findById(eventId);
    event.capacity += 1;
    await event.save();

    return { message: 'Registration canceled successfully' };
};

// Function to delete an event
const deleteEvent = async (eventId, userId) => {
    const event = await EventModel.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    if (event.userId.toString() !== userId.toString()) {
        throw new Error('You are not authorized to delete this event');
    }
    await EventModel.findByIdAndDelete(eventId);
    return { message: 'Event deleted successfully' };
};

// Function to update an event
const updateEvent = async (eventId, userId, updates) => {
    const event = await EventModel.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    if (event.userId.toString() !== userId.toString()) {
        throw new Error('You are not authorized to update this event');
    }

    Object.assign(event, updates);
    await event.save();
    return event;
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    registerForEvent,
    getEventRegistrations,
    cancelRegistration,
    deleteEvent,
    updateEvent,
};
