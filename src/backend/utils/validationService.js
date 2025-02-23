// validationService.js

const { body, param, validationResult } = require('express-validator');

// Function to validate user registration input
const validateUser Registration = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required.')
            .isLength({ min: 3, max: 30 })
            .withMessage('Username must be between 3 and 30 characters long.'),
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Invalid email format.'),
        body('password')
            .notEmpty()
            .withMessage('Password is required.')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long.'),
    ];
};

// Function to validate user login input
const validateUser Login = () => {
    return [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Invalid email format.'),
        body('password')
            .notEmpty()
            .withMessage('Password is required.'),
    ];
};

// Function to validate event creation input
const validateEventInput = () => {
    return [
        body('title')
            .trim()
            .notEmpty()
            .withMessage('Event title is required.')
            .isLength({ max: 100 })
            .withMessage('Event title must be at most 100 characters long.'),
        body('description')
            .trim()
            .notEmpty()
            .withMessage('Event description is required.')
            .isLength({ max: 2000 })
            .withMessage('Event description must be at most 2000 characters long.'),
        body('date')
            .isISO8601()
            .withMessage('Event date must be a valid date.'),
        body('location')
            .trim()
            .notEmpty()
            .withMessage('Event location is required.'),
        body('capacity')
            .isInt({ min: 1 })
            .withMessage('Event capacity must be a positive integer.'),
    ];
};

// Function to validate registration for an event
const validateRegistrationInput = () => {
    return [
        body('eventId')
            .trim()
            .notEmpty()
            .withMessage('Event ID is required.'),
    ];
};

// Function to validate fraud report input
const validateFraudReportInput = () => {
    return [
        body('transactionId')
            .trim()
            .notEmpty()
            .withMessage('Transaction ID is required.'),
        body('reason')
            .trim()
            .notEmpty()
            .withMessage('Reason for reporting fraud is required.'),
    ];
};

// Function to validate input and return errors
const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUser Registration,
    validateUser Login,
    validateEventInput,
    validateRegistrationInput,
    validateFraudReportInput,
    validateInput,
};
