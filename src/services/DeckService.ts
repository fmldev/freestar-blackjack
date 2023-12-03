class DeckService {
    private deck: Card[] = [];
  
    constructor() {
      this.initializeDeck();
    }
  
    private initializeDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
      this.deck = [];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          const card: Card = {
            suit,
            rank,
          };
          this.deck.push(card);
        }
      }
    }
  
    public shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    }
  
    public drawCard(): Card | undefined {
      return this.deck.pop();
    }
  }
  
  export interface Card {
    suit: string;
    rank: string;
  }
  
  export default DeckService;