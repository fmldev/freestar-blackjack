import DeckService, { Card } from '../services/DeckService';

describe('DeckService', () => {
  let deckService: DeckService;

  beforeEach(() => {
    deckService = new DeckService();
  });

  test('should initialize a deck with 52 cards', () => {
    expect(deckService['deck']).toHaveLength(52);
  });

  test('should shuffle the deck', () => {
    const initialDeck = [...deckService['deck']];
    deckService.shuffleDeck();
    expect(deckService['deck']).not.toEqual(initialDeck);
  });

  test('should draw a card from the deck', () => {
    const drawnCard = deckService.drawCard();
    expect(drawnCard).toBeDefined();
    expect(drawnCard).toHaveProperty('suit');
    expect(drawnCard).toHaveProperty('rank');
    expect(deckService['deck']).toHaveLength(51);
  });

  test('should draw undefined from an empty deck', () => {
    deckService['deck'] = [];
    const drawnCard = deckService.drawCard();
    expect(drawnCard).toBeUndefined();
  });
});