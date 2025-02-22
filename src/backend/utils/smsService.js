// src/backend/utils/smsService.js
const twilio = require('twilio');

// Initialize Twilio client
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send an SMS
const sendSMS = async (to, message) => {
    // Validate input
    if (!to || !message) {
        throw new Error('Recipient phone number and message are required to send an SMS.');
    }

    try {
        const sms = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to, // Recipient's phone number
        });

        console.log('SMS sent:', sms.sid);
        return sms;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Failed to send SMS.');
    }
};

// Export the SMS sending function
module.exports = {
    sendSMS,
};
