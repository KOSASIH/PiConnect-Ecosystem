// notificationUtils.js

const nodemailer = require('nodemailer'); // For sending email notifications
const { UserModel } = require('../models/userModel'); // Assuming a User model exists

// Function to create a notification message
const createNotificationMessage = (type, data) => {
    switch (type) {
        case 'event_registration':
            return `You have successfully registered for the event: ${data.eventTitle}.`;
        case 'event_reminder':
            return `Reminder: The event "${data.eventTitle}" is happening on ${data.eventDate}.`;
        case 'fraud_alert':
            return `Alert: Suspicious activity detected on your account. Please check your recent transactions.`;
        case 'community_post':
            return `New post in the community: "${data.postTitle}" by ${data.username}.`;
        default:
            return 'You have a new notification.';
    }
};

// Function to send email notifications
const sendEmailNotification = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to send push notifications (placeholder for actual implementation)
const sendPushNotification = (userId, title, message) => {
    // Placeholder for push notification logic
    console.log(`Push notification sent to user ${userId}: ${title} - ${message}`);
};

// Function to log notifications to the database
const logNotificationToDatabase = async (userId, type, message) => {
    const notification = new NotificationModel({
        userId,
        type,
        message,
        createdAt: new Date(),
    });

    await notification.save();
};

// Function to get user notification preferences
const getUser NotificationPreferences = async (userId) => {
    const user = await UserModel.findById(userId);
    return user.notificationPreferences; // Assuming preferences are stored in the User model
};

// Function to send notifications based on user preferences
const notifyUser  = async (userId, type, data) => {
    const preferences = await getUser NotificationPreferences(userId);
    const message = createNotificationMessage(type, data);

    if (preferences.email) {
        const user = await UserModel.findById(userId);
        await sendEmailNotification(user.email, 'New Notification', message);
    }

    if (preferences.push) {
        sendPushNotification(userId, 'New Notification', message);
    }

    // Log the notification to the database
    await logNotificationToDatabase(userId, type, message);
};

module.exports = {
    createNotificationMessage,
    sendEmailNotification,
    sendPushNotification,
    logNotificationToDatabase,
    getUser NotificationPreferences,
    notifyUser ,
};
