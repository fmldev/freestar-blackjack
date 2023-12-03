import React from 'react';
import { Card as CardType } from '../../services/DeckService';
import Card from '../Card/Card';

interface DealerProps {
  hand: CardType[];
  showAll: boolean;
}

const Dealer: React.FC<DealerProps> = ({ hand, showAll }) => {
  return (
    <div className="card-container">
      <h2 className="text-center mb-3">Dealer</h2>
      <div className="cards-wrapper">
        {hand.map((card, index) => (
          <Card key={index} card={card} show={showAll || index === 1} />
        ))}
      </div>
    </div>
  );
};

export default Dealer;