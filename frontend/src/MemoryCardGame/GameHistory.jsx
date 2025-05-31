import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameHistory.css';

const GameHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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

  const filteredHistory = history.filter(item =>
    item.userID?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="game-history-container">
      <div className="history-header">
        <button className="home-btn" onClick={() => navigate('/play')}>Home</button>
        <h2>Game Result History</h2>
      </div>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>
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
                <th>Wallet Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr><td colSpan="8">No game results found.</td></tr>
              ) : (
                filteredHistory.map((item, idx) => (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>
                    <td>{item.userID?.username || 'Unknown'}</td>
                    <td>{new Date(item.gameDate).toLocaleString()}</td>
                    <td>{item.difficulty}</td>
                    <td>{item.completed}</td>
                    <td>{item.failed}</td>
                    <td>{item.timeTaken}</td>
                    <td>{item.walletAddress ? `${item.walletAddress.slice(0, 6)}...${item.walletAddress.slice(-4)}` : '-'}</td>
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