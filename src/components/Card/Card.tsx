import React from 'react';
import { Card as CardType } from '../../services/DeckService';

interface CardProps {
  card: CardType;
  show: boolean;
}

const Card: React.FC<CardProps> = ({ card, show }) => {
  const getCardImageURL = (card: CardType): string => {
    const { suit, rank } = card;

    // In the https://deckofcardsapi.com/ 10s are represented as 0C (10 of Clubs), for example
    const formattedRank = rank === '10' ? '0' : rank;

    const imageName = `${formattedRank}${suit.charAt(0).toUpperCase()}.png`;
    return `https://deckofcardsapi.com/static/img/${imageName}`;
  };

  return (
    <div className={`card ${show ? '' : 'card-hidden'}`}>
      <img
        src={show ? getCardImageURL(card) : 'https://deckofcardsapi.com/static/img/back.png'}
        alt={show ? `${card.rank} of ${card.suit}` : 'Hidden'}
        className="card-img-top"
        style={{ width: '10rem' }}
      />
    </div>
  );
};

export default Card;