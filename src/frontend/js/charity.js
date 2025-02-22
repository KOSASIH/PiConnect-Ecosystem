// src/frontend/js/charity.js

// Function to fetch all charities
const fetchCharities = async () => {
    try {
        const response = await fetch('/api/charities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch charities');
        }

        const charities = await response.json();
        return charities; // Return the list of charities
    } catch (error) {
        console.error('Error fetching charities:', error);
        throw new Error('Failed to load charities. Please try again later.');
    }
};

// Function to fetch a specific charity by ID
const fetchCharityById = async (charityId) => {
    try {
        const response = await fetch(`/api/charities/${charityId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch charity details');
        }

        const charity = await response.json();
        return charity; // Return the charity details
    } catch (error) {
        console.error('Error fetching charity details:', error);
        throw new Error('Failed to load charity details. Please try again later.');
    }
};

// Function to create a new charity
const createCharity = async (name, description) => {
    try {
        const response = await fetch('/api/charities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error('Failed to create charity');
        }

        const newCharity = await response.json();
        return newCharity; // Return the created charity
    } catch (error) {
        console.error('Error creating charity:', error);
        throw new Error('Failed to create charity. Please try again later.');
    }
};

// Function to update an existing charity
const updateCharity = async (charityId, updates) => {
    try {
        const response = await fetch(`/api/charities/${charityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update charity');
        }

        const updatedCharity = await response.json();
        return updatedCharity; // Return the updated charity
    } catch (error) {
        console.error('Error updating charity:', error);
        throw new Error('Failed to update charity. Please try again later.');
    }
};

// Function to delete a charity
const deleteCharity = async (charityId) => {
    try {
        const response = await fetch(`/api/charities/${charityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete charity');
        }

        return true; // Return true if deletion was successful
    } catch (error) {
        console.error('Error deleting charity:', error);
        throw new Error('Failed to delete charity. Please try again later.');
    }
};

// Exporting the charity functions
export {
    fetchCharities,
    fetchCharityById,
    createCharity,
    updateCharity,
    deleteCharity,
};
