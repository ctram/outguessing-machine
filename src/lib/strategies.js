export class Strategy {
    constructor() {
    }

    humanNextInput() {
        throw ('function not implemented.')
    }
}

export class StrategyTwoInARow extends Strategy {
    constructor() {
        super(arguments);
    }

    humanNextInput(humanLastMoves) {
        if (humanLastMoves.length < 2) {
            return;
        }

        let a = humanLastMoves[humanLastMoves.length - 2];
        let b = humanLastMoves[humanLastMoves.length - 1];

        if (a === b) {
            return !a;
        }
    }
}
