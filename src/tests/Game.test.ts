import Game from '../services/Game';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test('should initialize a game with empty hands', () => {
    expect(game.playerHand).toHaveLength(0);
    expect(game.dealerHand).toHaveLength(0);
  });

  test('should start a game with non-empty hands', () => {
    game.startGame();
    expect(game.playerHand).not.toHaveLength(0);
    expect(game.dealerHand).not.toHaveLength(0);
  });

  test('should hit the player hand', () => {
    game.startGame();
    const initialHandLength = game.playerHand.length;
    game.hit();
    expect(game.playerHand.length).toBe(initialHandLength + 1);
  });

  test('should hit the dealer hand', () => {
    game.startGame();
    const initialHandLength = game.dealerHand.length;
    game.hitDealer();
    expect(game.dealerHand.length).toBe(initialHandLength + 1);
  });

  test('should stand and draw cards for the dealer until 17 or more', () => {
    game.startGame();
    game.dealerHand = [{ suit: 'D', rank: '2' }, { suit: 'C', rank: '2' }]; // Dealer has 4
    const initialDealerHandLength = game.dealerHand.length;
    game.stand();
    expect(game.dealerHand.length).toBeGreaterThan(initialDealerHandLength);
    expect(game.calculateHandValue(game.dealerHand)).toBeGreaterThanOrEqual(17);
  });

  test('should determine the winner correctly', () => {
    game.playerHand = [{ suit: 'H', rank: '10' }, { suit: 'S', rank: '10' }]; // Player has 20
    game.dealerHand = [{ suit: 'D', rank: '8' }, { suit: 'C', rank: '9' }]; // Dealer has 17
    expect(game.determineWinner()).toBe('Player wins!');
  });

});