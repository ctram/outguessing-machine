import { StrategyTwoInARow } from './strategies';

const STRATEGIES = [new StrategyTwoInARow()];

export class OutguessingEngine {
    constructor() {
        this.humanPriorMoves = [];
        this.strategies = STRATEGIES;
        this.score = { computer: 0, human: 0 };
    }

    guessRandomly() {
        return Math.round(Math.random() * 1);
    }

    guessHumansNextInput() {
        let nextMove = null;

        this.strategies.some(strategy => {
            let _nextMove = strategy.guessNextMove(this.humanPriorMoves);

            if (_nextMove !== null) {
                nextMove = _nextMove;
                return true;
            }

            return false;
        });

        if (nextMove !== null) {
            return nextMove;
        }

        return this.guessRandomly();
    }

    rememberHumanInput(humanChoice) {
        this.humanPriorMoves.push(humanChoice);
    }
}
