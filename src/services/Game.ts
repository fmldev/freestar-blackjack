import DeckService, { Card } from './DeckService';


export interface GameState {
  playerHand: Card[];
  dealerHand: Card[];
  startGame(): void;
  hit(): void;
  hitDealer(): void;
  determineWinner(): string;
  calculateHandValue(hand: Card[]): number;
}


class Game implements GameState {
  private deckService: DeckService;
  public playerHand: Card[] = [];
  public dealerHand: Card[] = [];

  constructor() {
    this.deckService = new DeckService();
  }

  public startGame() {
    this.deckService.shuffleDeck();
    this.playerHand = [this.deckService.drawCard()!, this.deckService.drawCard()!];
    this.dealerHand = [this.deckService.drawCard()!, this.deckService.drawCard()!];
  }

  public hit(): void {
    this.playerHand.push(this.deckService.drawCard()!);
  }

  hitDealer() {
    this.dealerHand.push(this.deckService.drawCard()!);
  }

  public stand() {
    while (this.calculateHandValue(this.dealerHand) < 17) {
      this.dealerHand.push(this.deckService.drawCard()!);
    }
  }

  public determineWinner(): string {
    const playerValue = this.calculateHandValue(this.playerHand);
    const dealerValue = this.calculateHandValue(this.dealerHand);

    const playerBusts = playerValue > 21;
    const dealerBusts = dealerValue > 21;
    
    if (playerBusts) {
      return 'Dealer wins. Player Busts!';
    } else if (dealerBusts) {
      return 'Player wins. Dealer busts!';
    } else if (playerValue > dealerValue) {
      return 'Player wins!';
    } else if (dealerValue > playerValue) {
      return 'Dealer wins!';
    } else {
      return 'Draw';
    }
  }

  public calculateHandValue(hand: Card[]): number {
    let value = 0;
    let aceCount = 0;

    for (const card of hand) {
      const rank = card.rank;
      if (rank === 'A') {
        aceCount += 1;
        value += 11;
      } else if (['K', 'Q', 'J'].includes(rank)) {
        value += 10;
      } else {
        value += parseInt(rank, 10);
      }
    }

    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount -= 1;
    }

    return value;
  }
}

export default Game;
