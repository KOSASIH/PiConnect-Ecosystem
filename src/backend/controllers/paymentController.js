// controllers/paymentController.js
const Payment = require('../models/transactionModel');

exports.processPayment = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        // Logic to process payment
        const newPayment = new Payment({ userId, amount });
        await newPayment.save();
        res.status(201).send({ message: 'Payment processed successfully', payment: newPayment });
    } catch (error) {
        res.status(500).send({ message: 'Payment processing failed', error });
    }
};

exports.getPaymentHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.find({ userId });
        res.status(200).send(payments);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve payment history', error });
    }
};
