// src/backend/utils/emailService.js
const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., 'smtp.example.com'
    port: process.env.EMAIL_PORT, // e.g., 587
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
    // Validate input
    if (!to || !subject || !text) {
        throw new Error('Recipient, subject, and text are required to send an email.');
    }

    const mailOptions = {
        from: process.env.EMAIL_FROM, // Sender address
        to, // List of recipients
        subject, // Subject line
        text, // Plain text body
        html, // HTML body (optional)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
};

// Export the email sending function
module.exports = {
    sendEmail,
};
