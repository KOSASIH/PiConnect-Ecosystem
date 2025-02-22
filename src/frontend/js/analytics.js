// src/frontend/js/analytics.js

// Function to fetch overall analytics data
const fetchOverallAnalytics = async () => {
    try {
        const response = await fetch('/api/analytics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch overall analytics');
        }

        const analyticsData = await response.json();
        return analyticsData; // Return the overall analytics data
    } catch (error) {
        console.error('Error fetching overall analytics:', error);
        throw new Error('Failed to load overall analytics. Please try again later.');
    }
};

// Function to fetch user-specific analytics
const fetchUser Analytics = async (userId) => {
    try {
        const response = await fetch(`/api/analytics/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user analytics');
        }

        const userAnalytics = await response.json();
        return userAnalytics; // Return the user-specific analytics data
    } catch (error) {
        console.error('Error fetching user analytics:', error);
        throw new Error('Failed to load user analytics. Please try again later.');
    }
};

// Function to fetch charity analytics
const fetchCharityAnalytics = async () => {
    try {
        const response = await fetch('/api/analytics/charity', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch charity analytics');
        }

        const charityAnalytics = await response.json();
        return charityAnalytics; // Return the charity analytics data
    } catch (error) {
        console.error('Error fetching charity analytics:', error);
        throw new Error('Failed to load charity analytics. Please try again later.');
    }
};

// Exporting the analytics functions
export {
    fetchOverallAnalytics,
    fetchUser Analytics,
    fetchCharityAnalytics,
};
