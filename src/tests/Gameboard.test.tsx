import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from '../components/GameBoard/GameBoard';

describe('Testing GameBoard UI', () => {
    
    const setup = () => {
        render(<GameBoard/>);
    }

    test('Title Rendering', () => {
        setup();
        expect(screen.getByTestId('title')).toBeInTheDocument();
        expect(screen.getByTestId('start-game-btn')).toBeInTheDocument();
    })


    test('startGame initializes the game state correctly', () => {    
        setup();
        
        fireEvent.click(screen.getByTestId('start-game-btn'));
        expect(screen.getByTestId('playing-actions')).toBeInTheDocument();

        // player score should be present
        expect(screen.getByTestId('player-score')).toBeInTheDocument();
        // check that dealer score doesn't exist before state is "end"
        expect(screen.queryByTestId('dealer-score')).toBeNull();
    });
})