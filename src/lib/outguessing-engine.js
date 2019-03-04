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
        let matchingStrategy = this.findMatchingStrategy(this.humanPriorMoves);

        if (matchingStrategy) {
            return matchingStrategy.guessHumansNextInput(this.humanPriorMoves);
        }

        return this.guessRandomly();
    }

    rememberHumanInput(humanChoice) {
        this.humanPriorMoves.push(humanChoice);
    }

    findMatchingStrategy(humanPriorMoves) {
        let matchingStrategy = null;

        this.strategies.some(strategy => {
            if (strategy.patternRegconized(humanPriorMoves)) {
                matchingStrategy = strategy;
                return true;
            }

            return false;
        });

        return matchingStrategy;
    }
}
