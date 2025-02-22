// src/frontend/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    return (
        <header className="bg-primary text-white text-center py-4">
            <h1 className="display-4">PiConnect Ecosystem</h1>
            <p className="lead">Empowering Charitable Giving with Technology</p>
            <nav>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/charities">Charities</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/analytics">Analytics</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/notifications">Notifications</Link>
                    </li>
                    {user ? (
                        <li className="nav-item">
                            <button className="btn btn-link nav-link text-white" onClick={onLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
