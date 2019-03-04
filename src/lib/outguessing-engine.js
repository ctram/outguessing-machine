import { StrategyTwoInARow } from "./strategies";

const STRATEGIES = [new StrategyTwoInARow()];


export class OutguessingEngine {
    constructor() {
        this.humanLastMoves = [];
        this.strategies = STRATEGIES;
        this.score = { computer: 0, human: 0 };
    }

    guessRandomly() {
        return Math.round(Math.random() * 1);
    }

    guessHumansNextInput() {
        let matchingStrategy = this.findMatchingStrategy(this.humanLastMoves);

        if (matchingStrategy) {
            return matchingStrategy.guessHumansNextInput(this.humanLastMoves);
        }
        
        return this.guessRandomly();
    }

    rememberHumanInput(humanChoice) {
        this.humanLastMoves.push(humanChoice);
    }

    findMatchingStrategy(humanLastMoves) {
        let matchingStrategy = null;
        
        this.strategies.some(strategy => {
            if (strategy.patternRegconized(humanLastMoves)) {
                matchingStrategy = strategy;
                return true;
            }

            return false;
        });

        return matchingStrategy;
    }
}
