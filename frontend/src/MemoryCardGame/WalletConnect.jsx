import React, { useState, useEffect } from 'react';

const WalletConnect = () => {
  const [address, setAddress] = useState(() => localStorage.getItem('walletAddress') || '');
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Restore address from localStorage
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
      localStorage.setItem('walletAddress', window.ethereum.selectedAddress);
    }
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0] || '');
        if (accounts[0]) {
          localStorage.setItem('walletAddress', accounts[0]);
        } else {
          localStorage.removeItem('walletAddress');
        }
      });
    }
    // Cleanup
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    setError('');
    setIsConnecting(true);
    if (!window.ethereum) {
      setError('MetaMask is not installed.');
      setIsConnecting(false);
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
    } catch (err) {
      setError('User rejected connection or another error occurred.');
    }
    setIsConnecting(false);
  };

  const shortAddress = (addr) => addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.5rem 0' }}>
      {address ? (
        <div style={{
          background: '#f1f5f9',
          borderRadius: '8px',
          padding: '0.7rem 1.2rem',
          color: '#222',
          fontWeight: 600,
          fontSize: '1.1rem',
          boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
        }}>
          Connected: <span style={{ color: '#6366f1' }}>{shortAddress(address)}</span>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.85rem 1.5rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s, transform 0.1s',
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && <div style={{ color: '#d32f2f', marginTop: '0.7rem', fontWeight: 500 }}>{error}</div>}
    </div>
  );
};

export default WalletConnect; 