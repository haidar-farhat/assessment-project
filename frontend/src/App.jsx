import React from 'react'
import WalletConnect from './MemoryCardGame/WalletConnect'
import './App.css'

function App({ children }) {
  return (
    <>
      <header className="global-header">
        <div className="header-content">
          <h1 className="app-title">Card Memory Game</h1>
          <WalletConnect />
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  )
}

export default App
