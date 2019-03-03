import React, { Component } from 'react';

export class Inputs extends Component {
    render() {
        let { gameInSession, handleHumanAction } = this.props;

        return (
            <div
                className={
                    'inputs d-flex flex-row justify-content-center' +
                    (gameInSession ? '' : ' d-none')
                }
            >
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        handleHumanAction(true);
                    }}
                >
                    1
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        handleHumanAction(false);
                    }}
                >
                    0
                </button>
            </div>
        );
    }
}
