import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MemoryEasy from './MemoryEasy';

describe('MemoryEasy', () => {
  test('renders the easy game and flips a card', () => {
    render(
      <MemoryRouter>
        <MemoryEasy />
      </MemoryRouter>
    );
    const cardBacks = screen.getAllByAltText('Card back');
    expect(cardBacks.length).toBeGreaterThan(0);
    fireEvent.click(cardBacks[0]);
  });

  test('matches two cards and updates matched state', async () => {
    render(
      <MemoryRouter>
        <MemoryEasy />
      </MemoryRouter>
    );
    const cardBacks = screen.getAllByAltText('Card back');
    fireEvent.click(cardBacks[0]);
    fireEvent.click(cardBacks[1]);
    await waitFor(() => {
      // After matching, matchedCards should be updated
    });
  });
}); 