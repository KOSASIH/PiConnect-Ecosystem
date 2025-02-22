// src/backend/services/charityService.js
const Charity = require('../models/charityModel');

// Create a new charity
const createCharity = async (name, description) => {
    // Validate input
    if (!name || !description) {
        throw new Error('Name and description are required.');
    }

    // Create a new charity
    const charity = new Charity({
        name,
        description,
    });

    // Save the charity to the database
    await charity.save();

    return charity;
};

// Get all charities
const getAllCharities = async () => {
    // Retrieve all charities from the database
    const charities = await Charity.find();
    return charities;
};

// Get a charity by ID
const getCharityById = async (charityId) => {
    // Validate input
    if (!charityId) {
        throw new Error('Charity ID is required.');
    }

    // Retrieve the charity by ID
    const charity = await Charity.findById(charityId);
    if (!charity) {
        throw new Error('Charity not found.');
    }

    return charity;
};

// Update a charity by ID
const updateCharity = async (charityId, updates) => {
    // Validate input
    if (!charityId || !updates) {
        throw new Error('Charity ID and updates are required.');
    }

    // Update the charity
    const charity = await Charity.findByIdAndUpdate(charityId, updates, { new: true });
    if (!charity) {
        throw new Error('Charity not found.');
    }

    return charity;
};

// Delete a charity by ID
const deleteCharity = async (charityId) => {
    // Validate input
    if (!charityId) {
        throw new Error('Charity ID is required.');
    }

    // Delete the charity
    const charity = await Charity.findByIdAndDelete(charityId);
    if (!charity) {
        throw new Error('Charity not found.');
    }

    return charity;
};

// Export the charity service functions
module.exports = {
    createCharity,
    getAllCharities,
    getCharityById,
    updateCharity,
    deleteCharity,
};
