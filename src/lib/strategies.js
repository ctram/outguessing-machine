class MethodNotImplementedError {
    constructor() {
        this.message = 'Method not implemented.';
    }
}

class NotEnoughPriorMovesError {
    constructor() {
        this.message = 'Not enough prior human moves to use strategy.';
    }
}

export class Strategy {
    constructor(strategy) {
        this.pattern = strategy.pattern;
        this.nextGuess = strategy.nextGuess;
    }

    humanNextInput() {
        throw new MethodNotImplementedError();
    }

    invertMoves(moves) {
        return moves.map(move => {
            return !move;
        });
    }

    guessRandomly() {
        return !!Math.round(Math.random() * 1);
    }

    guessNextMove(humanPriorMoves) {
        let subsetHumanPriorMoves = null;

        try {
            subsetHumanPriorMoves = this.subsetHumanPriorMoves(humanPriorMoves);
        } catch (e) {
            if (e instanceof NotEnoughPriorMovesError) {
                return this.guessRandomly();
            }

            throw e;
        }

        let res = subsetHumanPriorMoves.every((move, idx) => {
            return move === this.pattern[idx];
        });

        if (res) {
            return this.nextGuess;
        }

        res = this.invertMoves(subsetHumanPriorMoves).every((move, idx) => {
            return move === !this.pattern[idx];
        });

        if (res) {
            return !this.nextGuess;
        }

        return this.guessRandomly();
    }

    subsetHumanPriorMoves(humanPriorMoves) {
        if (humanPriorMoves.length < this.pattern.length) {
            throw new NotEnoughPriorMovesError();
        }

        return humanPriorMoves.slice(this.pattern.length * -1, humanPriorMoves.length);
    }
}

// TODO: next; no need for classes, just use an object
// TODO: next; add more strategy patterns;

export const STRATEGY_TWO_IN_A_ROW = {
    pattern: [true, true],
    nextGuess: false
}

export const STRATEGY_THREE_IN_A_ROW = {
    pattern: [true, true, true],
    nextGuess: true
}