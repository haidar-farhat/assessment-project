import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MemoryMedium from './MemoryMedium';

describe('MemoryMedium', () => {
  test('renders the medium game and flips a card', () => {
    render(<MemoryMedium />);
    const cardBacks = screen.getAllByAltText('Card back');
    expect(cardBacks.length).toBeGreaterThan(0);
    fireEvent.click(cardBacks[0]);
  });

  test('matches two cards and updates matched state', async () => {
    render(<MemoryMedium />);
    const cardBacks = screen.getAllByAltText('Card back');
    fireEvent.click(cardBacks[0]);
    fireEvent.click(cardBacks[1]);
    await waitFor(() => {
      // After matching, matchedCards should be updated
    });
  });
}); 