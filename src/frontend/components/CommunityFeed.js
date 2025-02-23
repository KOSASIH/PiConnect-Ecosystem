import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommunityFeed.css'; // Import CSS for styling

const CommunityFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');

    // Fetch community posts from the backend
    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts'); // Adjust the API endpoint as needed
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Handle liking a post
    const handleLike = async (postId) => {
        try {
            await axios.post(`/api/posts/${postId}/like`);
            fetchPosts(); // Refresh posts after liking
        } catch (err) {
            console.error('Failed to like the post:', err);
        }
    };

    // Handle adding a comment
    const handleCommentSubmit = async (postId) => {
        if (!newComment.trim()) return; // Prevent empty comments
        try {
            await axios.post(`/api/posts/${postId}/comments`, { content: newComment });
            setNewComment(''); // Clear the input
            fetchPosts(); // Refresh posts after commenting
        } catch (err) {
            console.error('Failed to add comment:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <div className="loading">Loading community posts...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="community-feed">
            <h2>Community Feed</h2>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => handleLike(post.id)}>Like ({post.likes.length})</button>
                            <div className="comments-section">
                                <h4>Comments</h4>
                                <ul>
                                    {post.comments.map((comment) => (
                                        <li key={comment.id} className="comment-item">
                                            <p>{comment.content}</p>
                                        </li>
                                    ))}
                                </ul>
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                />
                                <button onClick={() => handleCommentSubmit(post.id)}>Submit</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommunityFeed;
