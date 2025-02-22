// src/frontend/js/user.js

// Function to register a new user
const registerUser  = async (username, password, email) => {
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const result = await response.json();
        return result; // Return the registered user data
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to register user. Please try again later.');
    }
};

// Function to log in a user
const loginUser  = async (username, password) => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();
        return result; // Return the logged-in user data and token
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Failed to log in. Please check your credentials and try again.');
    }
};

// Function to fetch user details
const fetchUser Details = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userDetails = await response.json();
        return userDetails; // Return the user details
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Failed to fetch user details. Please try again later.');
    }
};

// Function to update user information
const updateUser  = async (userId, updates) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update user information');
        }

        const updatedUser  = await response.json();
        return updatedUser ; // Return the updated user data
    } catch (error) {
        console.error('Error updating user information:', error);
        throw new Error('Failed to update user information. Please try again later.');
    }
};

// Exporting the user functions
export {
    registerUser ,
    loginUser ,
    fetchUser Details,
    updateUser ,
};
