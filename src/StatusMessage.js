import React, { Component } from 'react';

export class StatusMessage extends Component {

    render() {
        let { stage } = this.props;
        let partial = null;

        if (stage === 'humanGuesses') {
            partial = 'Machine has made a guess. Go ahead and click on a button.'
        } else if (stage === 'computerRevealsGuess') {
            partial = <div>
                <h4>Machine Guessed</h4>
                <p>
                    {this.props.computerGuess}
                </p>

                <h4>Human Guessed</h4>
                <p>
                    {this.props.humanGuess}
                </p>
            </div>
        } else if (stage === 'scoreTally') {
            partial = <div className="text-capitalize">
                {this.props.winner} wins!
            </div>
        }
        
        return <div className="status-message">
            {partial}
        </div>
    }
};