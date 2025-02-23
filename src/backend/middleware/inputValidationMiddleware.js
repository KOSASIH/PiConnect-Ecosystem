// inputValidationMiddleware.js

const { body, param, validationResult } = require('express-validator');

// Middleware for validating post input
const validatePostInput = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required.')
        .isLength({ max: 100 })
        .withMessage('Title must be at most 100 characters long.'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required.')
        .isLength({ max: 2000 })
        .withMessage('Content must be at most 2000 characters long.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

// Middleware for validating comment input
const validateCommentInput = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Comment content is required.')
        .isLength({ max: 500 })
        .withMessage('Comment must be at most 500 characters long.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

// Middleware for validating event input
const validateEventInput = [
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

// Middleware for validating registration input
const validateRegistrationInput = [
    body('eventId')
        .trim()
        .notEmpty()
        .withMessage('Event ID is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

// Middleware for validating fraud report input
const validateFraudReportInput = [
    body('transactionId')
        .trim()
        .notEmpty()
        .withMessage('Transaction ID is required.'),
    body('reason')
        .trim()
        .notEmpty()
        .withMessage('Reason for reporting fraud is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validatePostInput,
    validateCommentInput,
    validateEventInput,
    validateRegistrationInput,
    validateFraudReportInput,
};
