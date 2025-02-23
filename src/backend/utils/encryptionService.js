// encryptionService.js

const crypto = require('crypto');

// Define constants for encryption
const ALGORITHM = 'aes-256-cbc'; // Encryption algorithm
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key'; // Secret key for encryption (should be stored securely)
const IV_LENGTH = 16; // Initialization vector length

// Function to encrypt data
const encrypt = (text) => {
    // Generate a random initialization vector
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV and encrypted data as a single string
    return iv.toString('hex') + ':' + encrypted;
};

// Function to decrypt data
const decrypt = (encryptedText) => {
    // Split the IV and encrypted data
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedData = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Function to hash passwords
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Function to compare hashed passwords
const comparePasswords = (password, hashedPassword) => {
    const hashedInputPassword = hashPassword(password);
    return hashedInputPassword === hashedPassword;
};

module.exports = {
    encrypt,
    decrypt,
    hashPassword,
    comparePasswords,
};
