// src/backend/controllers/charityController.js
const Charity = require('../models/charityModel');

// Create a new charity
exports.createCharity = async (req, res) => {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
        return res.status(400).send({ message: 'Name and description are required.' });
    }

    try {
        // Create a new charity
        const newCharity = new Charity({ name, description });
        await newCharity.save();

        // Respond with success
        res.status(201).send({ message: 'Charity created successfully', charity: newCharity });
    } catch (error) {
        console.error('Charity creation error:', error);
        res.status(500).send({ message: 'Charity creation failed', error });
    }
};

// Get all charities
exports.getAllCharities = async (req, res) => {
    try {
        const charities = await Charity.find();
        res.status(200).send(charities);
    } catch (error) {
        console.error('Error retrieving charities:', error);
        res.status(500).send({ message: 'Failed to retrieve charities', error });
    }
};

// Get a specific charity by ID
exports.getCharityById = async (req, res) => {
    const { charityId } = req.params;

    try {
        const charity = await Charity.findById(charityId);
        if (!charity) {
            return res.status(404).send({ message: 'Charity not found' });
        }
        res.status(200).send(charity);
    } catch (error) {
        console.error('Error retrieving charity:', error);
        res.status(500).send({ message: 'Failed to retrieve charity', error });
    }
};

// Update a charity by ID
exports.updateCharity = async (req, res) => {
    const { charityId } = req.params;
    const { name, description } = req.body;

    try {
        const updatedCharity = await Charity.findByIdAndUpdate(
            charityId,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCharity) {
            return res.status(404).send({ message: 'Charity not found' });
        }

        res.status(200).send({ message: 'Charity updated successfully', charity: updatedCharity });
    } catch (error) {
        console.error('Charity update error:', error);
        res.status(500).send({ message: 'Charity update failed', error });
    }
};

// Delete a charity by ID
exports.deleteCharity = async (req, res) => {
    const { charityId } = req.params;

    try {
        const deletedCharity = await Charity.findByIdAndDelete(charityId);
        if (!deletedCharity) {
            return res.status(404).send({ message: 'Charity not found' });
        }
        res.status(200).send({ message: 'Charity deleted successfully' });
    } catch (error) {
        console.error('Charity deletion error:', error);
        res.status(500).send({ message: 'Charity deletion failed', error });
    }
};
