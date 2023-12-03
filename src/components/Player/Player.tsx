import React from 'react';
import { Card as CardType } from '../../services/DeckService';
import Card from '../Card/Card';

interface PlayerProps {
  hand: CardType[];
}

const Player: React.FC<PlayerProps> = ({ hand }) => {
  return (
    <div className="card-container">
      <h2 className="text-center mb-4">Player</h2>
      <div className="cards-wrapper">
        {hand.map((card, index) => (
          <Card key={index} card={card} show={true} />
        ))}
      </div>
    </div>
  );
};

export default Player;