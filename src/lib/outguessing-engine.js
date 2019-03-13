import { StrategyTwoInARow } from './strategies';

const STRATEGIES = [new StrategyTwoInARow()];

export class OutguessingEngine {
    constructor() {
        this.humanPriorMoves = [];
        this.strategies = STRATEGIES;
        this.score = { computer: 0, human: 0 };
    }

    guessHumansNextInput() {
        let nextMove = null;

        this.strategies.some(strategy => {
            let _nextMove = null;

            _nextMove = strategy.guessNextMove(this.humanPriorMoves);

            if (_nextMove !== null) {
                nextMove = _nextMove;
                return true; // early break
            }

            return false;
        });

        return nextMove;
    }

    rememberHumanInput(humanChoice) {
        this.humanPriorMoves.push(humanChoice);
    }
}
