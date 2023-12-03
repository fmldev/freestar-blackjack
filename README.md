# Blackjack Card Game

## Getting Started

### Prerequisites

- Node.js and NPM installed.

### Installation

1. Clone the repository.
2. Install dependencies:

    ```bash
    npm install
    ```
### Running the App

To start the app, run:

   ```bash
   npm start
   ```

Open http://localhost:3000 in your browser to play the game.

### Running Tests

To run the tests, use:

   ```bash
   npm test
   ```

### Technologies Used:

- React (JS framework)
- TypeScript (JS superset)
- Bootstrap (CSS framework)
- Jest (JS testing framework)

### Known Issues / Future Additions

- When the player scores Blackjack on the initial play, the program doesn't "stand" as expected.
- Test Components' UI; this can be done using React's Testing Library's render and having a data-testid in each of the tags we want to look at. There is a quick example in Gameboard.test.tsx