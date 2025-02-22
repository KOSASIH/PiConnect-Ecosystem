// src/frontend/components/Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light text-center py-4">
            <p>&copy; 2023 PiConnect Ecosystem. All rights reserved.</p>
            <div>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
