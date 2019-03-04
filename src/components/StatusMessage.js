import React, { Component } from 'react';
import * as STAGES from '../constants/stages';

export class StatusMessage extends Component {
    render() {
        let { stage } = this.props;
        let partial = null;

        if (stage === STAGES.STAGE_PRESTART) {
            console.log('prestart, this is fine.');
        } else if (stage === STAGES.STAGE_HUMAN_GUESSES) {
            partial = 'Machine has made a guess. Go ahead and click on a button.';
        } else if (stage === STAGES.STAGE_REAVEL) {
            partial = (
                <div className="d-flex flex-row justify-content-center">
                    <div className="guess">
                        <h4>Machine Guessed</h4>
                        <p>{this.props.computerGuess ? '1' : '0'}</p>
                    </div>

                    <div className="guess">
                        <h4>Human Guessed</h4>
                        <p>{this.props.humanGuess ? '1' : '0'}</p>
                    </div>
                </div>
            );
        } else if (stage === STAGES.STAGE_END) {
            partial = <div className="text-capitalize">{this.props.winner} wins!</div>;
        } else {
            console.error("Whoops, no stage passed, this shouldn't happen.");
        }

        return <div className="status-message">{partial}</div>;
    }
}
