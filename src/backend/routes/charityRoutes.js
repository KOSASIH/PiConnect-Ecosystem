// src/backend/routes/charityRoutes.js
const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');

// Route to create a new charity
router.post('/', charityController.createCharity);

// Route to get all charities
router.get('/', charityController.getAllCharities);

// Route to get a specific charity by ID
router.get('/:charityId', charityController.getCharityById);

// Route to update a charity by ID
router.put('/:charityId', charityController.updateCharity);

// Route to delete a charity by ID
router.delete('/:charityId', charityController.deleteCharity);

// Export the charity routes
module.exports = router;
