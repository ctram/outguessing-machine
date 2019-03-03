import React, { Component } from 'react';

export class Inputs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { gameInSession } = this.props;

        return <div className={"inputs d-flex flex-row justify-content-center" + (gameInSession ? '' : ' d-none')}>
            <button className="btn btn-primary">
                1
            </button>
            <button className="btn btn-primary">
                0
            </button>
        </div>
    }
};