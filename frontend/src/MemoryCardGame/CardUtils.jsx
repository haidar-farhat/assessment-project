// Utility to shuffle cards (Fisher-Yates, memoized)
export const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Utility to check if a card is flipped
export const isCardFlipped = (card, flippedCards, matchedCards, initialReveal) => {
  return (
    initialReveal ||
    flippedCards.some((c) => c.id === card.id) ||
    matchedCards.includes(card.id)
  );
};
  