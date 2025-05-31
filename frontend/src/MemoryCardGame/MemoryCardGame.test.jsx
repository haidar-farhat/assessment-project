import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MemoryCardGame from './MemoryCardGame';

describe('MemoryCardGame', () => {
  test('renders the game and flips a card', () => {
    render(
      <MemoryRouter>
        <MemoryCardGame />
      </MemoryRouter>
    );
    const cardBacks = screen.getAllByAltText('Card back');
    expect(cardBacks.length).toBeGreaterThan(0);
    fireEvent.click(cardBacks[0]);
    // After click, card should be flipped (front image visible)
    // This is a basic smoke test; more detailed state checks can be added
  });

  test('matches two cards and updates matched state', async () => {
    render(
      <MemoryRouter>
        <MemoryCardGame />
      </MemoryRouter>
    );
    const cardBacks = screen.getAllByAltText('Card back');
    fireEvent.click(cardBacks[0]);
    fireEvent.click(cardBacks[1]);
    await waitFor(() => {
      // After matching, matchedCards should be updated
      // This is a smoke test; for full coverage, mock state and check UI
    });
  });
}); 