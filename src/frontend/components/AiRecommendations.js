import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AiRecommendations.css'; // Import CSS for styling

const AiRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch AI recommendations from the backend
    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('/api/recommendations'); // Adjust the API endpoint as needed
            setRecommendations(response.data);
        } catch (err) {
            setError('Failed to fetch recommendations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    if (loading) {
        return <div className="loading">Loading recommendations...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="ai-recommendations">
            <h2>AI Recommendations</h2>
            <ul>
                {recommendations.map((recommendation) => (
                    <li key={recommendation.id} className="recommendation-item">
                        <h3>{recommendation.title}</h3>
                        <p>{recommendation.description}</p>
                        <a href={recommendation.link} className="recommendation-link">View More</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AiRecommendations;
