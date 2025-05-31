import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import WalletConnect from './MemoryCardGame/WalletConnect'
import './App.css'

function App({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login');
  };

  return (
    <>
      <nav className="global-header">
        <div className="header-content">
          <div className="app-title" style={{ cursor: 'pointer' }} onClick={() => navigate('/play')}>
            Card Memory Game
          </div>
          <ul className="nav-links">
            {isAuthenticated && <li><NavLink to="/play" className={({ isActive }) => isActive ? 'active' : ''}>Play</NavLink></li>}
            {isAuthenticated && <li><NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink></li>}
            {!isAuthenticated && <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink></li>}
            {!isAuthenticated && <li><NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink></li>}
            {isAuthenticated && <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>}
          </ul>
          <WalletConnect />
        </div>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}

export default App
