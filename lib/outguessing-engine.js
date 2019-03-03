export class OutguessingMachine {

    constructor(strategies = []) {
        this.opponentLastMoves = [];
        this.strategies = [].concat(strategies);
        this.score = { computer: 0, opponent: 0 };
    }

    guessOpponentsNextInput() {
        winningStrategy = null;

        this.strategies.some(strategy => {
            winningStrategy = strategy.opponentNextInput(this.opponentLastMoves);

            if (winningStrategy !== undefined && winningStrategy !== null) {
                return true;
            }
        });

        if (winningStrategy !== undefined && winningStrategy !== null) {
            return winningStrategy;
        }

        return Math.round(Math.random() * 1);
    }

    rememberOpponentInput(input) {
        this.opponentLastMoves.push(input);

        this.strategies.forEach(strategy => {
            strategy.rememberOpponentInput(input);
        })
    }
}