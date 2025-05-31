import React, { useState, useEffect } from 'react';

const MetaMaskIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" style={{ verticalAlign: 'middle', marginRight: 6 }}>
    <polygon fill="#e2761b" points="30.8,1.2 17.2,10.6 19.7,5.2 "/>
    <polygon fill="#e4761b" points="1.2,1.2 12.2,10.7 12.3,5.2 "/>
    <polygon fill="#d7c1b3" points="25.6,23.2 21.7,26.1 24.6,28.6 25.3,28.5 28.7,28.6 "/>
    <polygon fill="#233447" points="6.4,23.2 10.3,26.1 7.4,28.6 6.7,28.5 3.3,28.6 "/>
    <polygon fill="#cd6116" points="13.6,14.7 12.2,17.2 17.8,17.2 16.4,14.7 "/>
    <polygon fill="#e4751f" points="19.7,5.2 17.2,10.6 21.7,10.7 "/>
    <polygon fill="#e4751f" points="12.3,5.2 10.3,10.7 12.2,10.7 "/>
    <polygon fill="#f6851b" points="21.7,10.7 17.2,10.6 17.8,17.2 21.7,17.2 "/>
    <polygon fill="#f6851b" points="10.3,10.7 12.2,10.7 12.2,17.2 7.4,17.2 "/>
    <polygon fill="#763d16" points="7.4,17.2 12.2,17.2 13.6,14.7 "/>
    <polygon fill="#763d16" points="21.7,17.2 17.8,17.2 16.4,14.7 "/>
  </svg>
);

const WalletConnect = () => {
  const [address, setAddress] = useState(() => localStorage.getItem('walletAddress') || '');
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.5rem 0' }}>
      {address ? (
        <>
          <div style={{
            background: '#f1f5f9',
            borderRadius: '8px',
            padding: '0.7rem 1.2rem',
            color: '#222',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <MetaMaskIcon />
            <span style={{ color: '#6366f1' }}>{shortAddress(address)}</span>
            <button
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.1rem',
                marginLeft: '0.3rem',
                padding: 0,
              }}
              title="Copy address"
            >
              📋
            </button>
            {copied && <span style={{ color: '#22c55e', fontSize: '0.95rem', marginLeft: 4 }}>Copied!</span>}
          </div>
          <button
            onClick={() => {
              setAddress('');
              localStorage.removeItem('walletAddress');
            }}
            style={{
              background: 'linear-gradient(90deg, #a5b4fc 0%, #818cf8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              transition: 'background 0.2s, transform 0.1s',
            }}
          >
            Disconnect
          </button>
        </>
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