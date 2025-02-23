import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FraudAlert.css'; // Import CSS for styling

const FraudAlert = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch fraud alerts from the backend
    const fetchFraudAlerts = async () => {
        try {
            const response = await axios.get('/api/fraud-alerts'); // Adjust the API endpoint as needed
            setAlerts(response.data);
        } catch (err) {
            setError('Failed to fetch fraud alerts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFraudAlerts();
    }, []);

    if (loading) {
        return <div className="loading">Loading fraud alerts...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="fraud-alert">
            <h2>Fraud Alerts</h2>
            {alerts.length === 0 ? (
                <p>No fraud alerts at this time.</p>
            ) : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id} className="alert-item">
                            <h3>{alert.title}</h3>
                            <p>{alert.message}</p>
                            <p><strong>Status:</strong> {alert.status}</p>
                            <p><strong>Date:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FraudAlert;
