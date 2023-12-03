import React, { useState } from 'react';
import Player from '../Player/Player';
import Dealer from '../Dealer/Dealer';
import Game, { GameState } from '../../services/Game';

const GameBoard: React.FC = () => {
  const [game, setGame] = useState<GameState>(new Game());
  const [gameState, setGameState] = useState('initial');
  const [showDealerCards, setShowDealerCards] = useState(false);
  const [, setPlayerScore] = useState(0); // player score is used to update the UI

  const startGame = () => {
    const newGame = new Game();
    newGame.startGame();

    setGame(newGame);
    setGameState('playing');
    setShowDealerCards(false);
    setPlayerScore(game.calculateHandValue(game.playerHand));

    // if it's an immediate Blackjack, stand
    if (game.calculateHandValue(game.playerHand) === 21) {
      stand();
    }
  };

  const hit = () => {
    game.hit();
    setPlayerScore(game.calculateHandValue(game.playerHand));
    if (game.calculateHandValue(game.playerHand) > 21) {
      game.determineWinner();
      endGame();
    }
  };

  const stand = () => {
    while (game.calculateHandValue(game.dealerHand) < 17) {
      game.hitDealer();
    }

    endGame();
  };

  const endGame = () => {
    setGameState('end');
    setShowDealerCards(true);
  };


  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center text-danger" data-testid='title'>Blackjack Game</h1>
      {(gameState === 'playing' || gameState === 'end') && (<div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="dealer-area">
            <Dealer hand={game['dealerHand']} showAll={showDealerCards}/>
            {gameState === 'end' && (
              <div>
                <p className="mt-3 mb-0">
                  Dealer Score: {game.calculateHandValue(game['dealerHand'])}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-12 mt-5">
          <div className="player-area">
            <Player hand={game['playerHand']}/>
            <p className="mt-3" data-testid='player-score'>Player Score: {game.calculateHandValue(game['playerHand'])}</p>
          </div>
        </div>
      </div>)}
      <div className="text-center mt-4" data-testid='playing-actions'>
        {gameState === 'playing' && (
          <>
            <button className="btn btn-success mx-2" onClick={hit}>
              <i className="bi bi-file-plus"></i>
              Hit
            </button>
            <button className="btn btn-success mx-2" onClick={stand}>
             <i className="bi bi-file-excel"></i>
              Stand
            </button>
          </>
        )}
        {gameState === 'end' && (
          <h4 className="my-3">
            <b>{game.determineWinner() === 'Draw' ? "It's a Draw!" : game.determineWinner()}</b>
          </h4>
        )}
        {(gameState === 'initial' || gameState === 'end') && (
          <button data-testid="start-game-btn" className="btn btn-success mx-2" onClick={startGame}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;