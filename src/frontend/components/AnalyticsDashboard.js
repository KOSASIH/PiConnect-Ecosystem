// src/frontend/components/AnalyticsDashboard.js

import React, { useEffect, useState } from 'react';
import { fetchOverallAnalytics } from '../js/analytics'; // Import the analytics fetching function

const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch overall analytics data
    const loadAnalyticsData = async () => {
        try {
            const data = await fetchOverallAnalytics();
            setAnalyticsData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnalyticsData();
    }, []);

    if (loading) {
        return <div>Loading analytics data...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Analytics Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Total Donations</div>
                        <div className="card-body">
                            <h5 className="card-title">${analyticsData.totalDonations.toFixed(2)}</h5>
                            <p className="card-text">Total amount donated across all charities.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-header">Total Users</div>
                        <div className="card-body">
                            <h5 className="card-title">{analyticsData.totalUsers}</h5>
                            <p className="card-text">Total number of registered users.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-header">Active Charities</div>
                        <div className="card-body">
                            <h5 className="card-title">{analyticsData.activeCharities}</h5>
                            <p className="card-text">Number of charities currently active on the platform.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">Recent Donations</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>User</th>
                                <th>Charity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsData.recentDonations.length > 0 ? (
                                analyticsData.recentDonations.map((donation) => (
                                    <tr key={donation.id}>
                                        <td>{new Date(donation.date).toLocaleDateString()}</td>
                                        <td>{donation.user}</td>
                                        <td>{donation.charity}</td>
                                        <td>${donation.amount.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No recent donations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
