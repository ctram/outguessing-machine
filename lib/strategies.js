export class Strategy {
    constructor() {
    }

    opponentNextInput() {
        throw ('function not implemented.')
    }
}

export class StrategyTwoInARow extends Strategy {
    constructor() {
        super(arguments);
    }

    opponentNextInput(opponentLastMoves) {
        if (opponentLastMoves.length < 2) {
            return;
        }

        let a = opponentLastMoves[opponentLastMoves.length - 2];
        let b = opponentLastMoves[opponentLastMoves.length - 1];

        if (a === b) {
            return !a;
        }
    }
}
