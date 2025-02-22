// routes/charityRoutes.js
const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');

// Create a new charity
router.post('/', charityController.createCharity);

// Get all charities
router.get('/', charityController.getAllCharities);

// Get a specific charity by ID
router.get('/:charityId', charityController.getCharityById);

// Update a charity by ID
router.put('/:charityId', charityController.updateCharity);

// Delete a charity by ID
router.delete('/:charityId', charityController.deleteCharity);

module.exports = router;
