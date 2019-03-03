import React, { Component } from 'react';

class InnerScore extends Component {
    render() {
        let { header, value } = this.props;

        return <div>
            <h4>
                {header}
            </h4>
            <p>
                {value}
            </p>
        </div>
    }
}

InnerScore.defaultProps = {
    header: '',
    value: ''
}

export class ScoreBoard extends Component {
    render() {
        let { roundNumber, scoreComputer, scoreHuman } = this.props;

        return <div className="score-board d-flex flex-row justify-content-around">
            <InnerScore header="Round Number" value={roundNumber} />
            <InnerScore header="Computer" value={scoreComputer} />
            <InnerScore header="Human" value={scoreHuman} />
        </div>
    }
};

ScoreBoard.defaultProps = {
    roundNumber: 0,
    scoreComputer: 0,
    scoreHuman: 0
};