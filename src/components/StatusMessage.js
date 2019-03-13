import React, { Component } from 'react';
import * as STAGES from '../constants/stages';

export class StatusMessage extends Component {
    render() {
        let { stage, isFinalRound } = this.props;
        let partialMain = null;
        let partialTryAgain = null;

        if (stage === STAGES.STAGE_PRESTART) {
            console.log('prestart, this is fine.');
        } else if (stage === STAGES.STAGE_HUMAN_GUESSES) {
            partialMain = 'Machine has made a guess. Go ahead and click on a button.';
        } else if (stage === STAGES.STAGE_REAVEL) {
            partialMain = (
                <div className="d-flex flex-row justify-content-center">
                    <div className="guess">
                        <h4>Machine Guessed</h4>
                        <p>{this.props.computerGuess ? '1' : '0'}</p>
                    </div>

                    <div className="guess">
                        <h4>Human Guessed</h4>
                        <p>{this.props.humanChoice ? '1' : '0'}</p>
                    </div>
                </div>
            );
        } else if (stage === STAGES.STAGE_END) {
            partialMain = <div className="text-capitalize">{this.props.winner} wins!</div>;
        } else {
            console.error("Whoops, no stage passed, this shouldn't happen.");
        }

        if (stage === STAGES.STAGE_REAVEL && !isFinalRound) {
            partialTryAgain = <p>Try again?</p>;
        }

        return (
            <div className="status-message">
                {partialMain}
                {partialTryAgain}
            </div>
        );
    }
}
