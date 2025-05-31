import React, { useEffect, useState } from 'react';
import './GameHistory.css';

const GameHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/memory/history');
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        } else {
          setError(data.message || 'Failed to fetch history');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="game-history-container">
      <h2>Game Result History</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Date</th>
                <th>Difficulty</th>
                <th>Completed</th>
                <th>Failed</th>
                <th>Time Taken (s)</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan="7">No game results found.</td></tr>
              ) : (
                history.map((item, idx) => (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>
                    <td>{item.userID?.username || 'Unknown'}</td>
                    <td>{new Date(item.gameDate).toLocaleString()}</td>
                    <td>{item.difficulty}</td>
                    <td>{item.completed}</td>
                    <td>{item.failed}</td>
                    <td>{item.timeTaken}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameHistory; 