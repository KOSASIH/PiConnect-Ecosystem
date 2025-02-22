// src/frontend/components/TransactionList.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TransactionList = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch transactions for the user
    const fetchTransactions = async () => {
        try {
            const response = await fetch(`/api/users/${userId}/transactions`);
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [userId]);

    if (loading) {
        return <div>Loading transactions...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Transaction History</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

TransactionList.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default TransactionList;
