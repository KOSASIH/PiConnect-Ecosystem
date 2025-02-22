// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ username, password: hashedPassword });
        await newUser .save();
        res.status(201).send({ message: 'User  registered successfully', user: newUser  });
    } catch (error) {
        res.status(500).send({ message: 'User  registration failed', error });
    }
};

exports.loginUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: ' Logic**

```javascript
// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ username, password: hashedPassword });
        await newUser .save();
        res.status(201).send({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'User  registration failed', error });
    }
};

exports.loginUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare1h' });
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ message: 'Login failed', error });
    }
};
