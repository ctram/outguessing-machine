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
    humanNextInput() {
        throw new MethodNotImplementedError();
    }

    invertMoves(moves) {
        return moves.map(move => {
            return !move;
        });
    }

    guessNextMove(humanPriorMoves) {
        let subsetHumanPriorMoves = this.subsetHumanPriorMoves(humanPriorMoves);

        let res = subsetHumanPriorMoves.every((move, idx) => {
            return move === subsetHumanPriorMoves[idx];
        });

        if (res) {
            return true;
        }

        res =  this.invertMoves(subsetHumanPriorMoves).every((move, idx) => {
            return move === subsetHumanPriorMoves[idx];
        });

        if (res) {
            return false;
        }

        return null;
    }

    subsetHumanPriorMoves(humanPriorMoves) {
        if (humanPriorMoves.length < this.lengthOfPattern) {
            throw new NotEnoughPriorMovesError();
        }

        humanPriorMoves.slice(this.lengthOfPattern * -1, humanPriorMoves.length);
    }
}

export class StrategyTwoInARow extends Strategy {
    constructor() {
        super();
        this.pattern = [true, true];
        this.nextGuess = false;
    }
}
