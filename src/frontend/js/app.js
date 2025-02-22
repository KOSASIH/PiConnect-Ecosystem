// src/frontend/js/app.js

// Function to fetch charities from the API
const fetchCharities = async () => {
    try {
        const response = await fetch('/api/charities');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const charities = await response.json();
        renderCharities(charities);
    } catch (error) {
        console.error('Error fetching charities:', error);
        displayError('Failed to load charities. Please try again later.');
    }
};

// Function to render charity cards
const renderCharities = (charities) => {
    const charityList = document.getElementById('charity-list');
    charityList.innerHTML = ''; // Clear existing content

    charities.forEach(charity => {
        const charityCard = document.createElement('div');
        charityCard.className = 'col-md-4 charity-card';
        charityCard.innerHTML = `
            <h3>${charity.name}</h3>
            <p>${charity.description}</p>
            <button class="btn btn-primary" onclick="donate('${charity._id}')">Donate</button>
        `;
        charityList.appendChild(charityCard);
    });
};

// Function to handle donations
const donate = async (charityId) => {
    const amount = prompt('Enter donation amount:');
    if (amount && !isNaN(amount) && amount > 0) {
        try {
            const response = await fetch(`/api/charities/${charityId}/donate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            alert(`Thank you for your donation of $${amount} to ${result.charityName}!`);
        } catch (error) {
            console.error('Error processing donation:', error);
            displayError('Failed to process donation. Please try again later.');
        }
    } else {
        alert('Please enter a valid donation amount.');
    }
};

// Function to display error messages
const displayError = (message) => {
    const charityList = document.getElementById('charity-list');
    charityList.innerHTML = `<div class="alert alert-danger">${message}</div>`;
};

// Initialize the application
const init = () => {
    fetchCharities(); // Fetch and display charities on page load
};

// Run the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
