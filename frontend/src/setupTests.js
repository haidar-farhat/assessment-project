import '@testing-library/jest-dom'; 

// Mock HTMLMediaElement.play for jsdom (Vitest/Jest)
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  writable: true,
  value: () => Promise.resolve(),
}); 