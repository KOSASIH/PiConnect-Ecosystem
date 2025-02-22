// src/frontend/js/payment.js

// Function to initiate a payment
const initiatePayment = async (charityId, amount) => {
    try {
        const response = await fetch(`/api/charities/${charityId}/donate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            throw new Error('Payment initiation failed');
        }

        const result = await response.json();
        return result; // Return the payment result
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw new Error('Failed to initiate payment. Please try again later.');
    }
};

// Function to handle payment confirmation
const confirmPayment = async (paymentId) => {
    try {
        const response = await fetch(`/api/payments/${paymentId}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Payment confirmation failed');
        }

        const result = await response.json();
        return result; // Return the confirmation result
    } catch (error) {
        console.error('Error confirming payment:', error);
        throw new Error('Failed to confirm payment. Please try again later.');
    }
};

// Function to handle payment cancellation
const cancelPayment = async (paymentId) => {
    try {
        const response = await fetch(`/api/payments/${paymentId}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Payment cancellation failed');
        }

        const result = await response.json();
        return result; // Return the cancellation result
    } catch (error) {
        console.error('Error cancelling payment:', error);
        throw new Error('Failed to cancel payment. Please try again later.');
    }
};

// Function to validate payment information
const validatePaymentInfo = (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error('Invalid payment amount. Please enter a positive number.');
    }
};

// Exporting the payment functions
export {
    initiatePayment,
    confirmPayment,
    cancelPayment,
    validatePaymentInfo,
};
