import React from 'react';
import './EventCard.css'; // Import CSS for styling

const EventCard = ({ event, onRegister }) => {
    const handleRegister = () => {
        if (onRegister) {
            onRegister(event.id); // Call the onRegister function passed as a prop
        }
    };

    return (
        <div className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <p className="event-date"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p className="event-location"><strong>Location:</strong> {event.location}</p>
            <p className="event-capacity"><strong>Capacity:</strong> {event.capacity} spots available</p>
            <button className="register-button" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
};

export default EventCard;
