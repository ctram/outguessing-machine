class MethodNotImplementedError {
    constructor() {
        this.message = 'Method not implemented.';
    }
}

export class Strategy {
    humanNextInput() {
        throw new MethodNotImplementedError();
    }
}

export class StrategyTwoInARow extends Strategy {
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
