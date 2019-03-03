export class OutguessingEngine {

    constructor(strategies = []) {
        this.humanLastMoves = [];
        this.strategies = [].concat(strategies);
        this.score = { computer: 0, human: 0 };
    }

    guessHumansNextInput() {
        winningStrategy = null;

        this.strategies.some(strategy => {
            winningStrategy = strategy.humanNextInput(this.humanLastMoves);

            if (winningStrategy !== undefined && winningStrategy !== null) {
                return true;
            }
        });

        if (winningStrategy !== undefined && winningStrategy !== null) {
            return winningStrategy;
        }

        return Math.round(Math.random() * 1);
    }

    rememberHumanInput(input) {
        this.humanLastMoves.push(input);

        this.strategies.forEach(strategy => {
            strategy.rememberHumanInput(input);
        })
    }
}