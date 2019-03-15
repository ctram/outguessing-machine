import React, { Component } from 'react';

import { Inputs } from './components/Inputs';
import { ScoreBoard } from './components/ScoreBoard';
import { StatusMessage } from './components/StatusMessage';

import { OutguessingEngine } from './lib/outguessing-engine.js';

import * as STAGES from './constants/stages';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.outguessingEngine = new OutguessingEngine();

        this.state = {
            gameInSession: false,
            roundNumber: 0,
            scoreHuman: 0,
            scoreComputer: 0,
            stage: STAGES.STAGE_PRESTART
        };

        this.maxRoundNumber = 10;

        this.clickStartButton = this.clickStartButton.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleHumanAction = this.handleHumanAction.bind(this);
    }

    clickStartButton() {
        this.startGame();
    }

    startGame() {
        this.setState({
            gameInSession: true,
            scoreHuman: 0,
            scoreComputer: 0,
            stage: STAGES.STAGE_HUMAN_GUESSES,
            roundNumber: 1
        });
    }

    handleHumanAction(humanChoice) {
        let { scoreComputer, scoreHuman } = this.state;

        let nextStage = STAGES.STAGE_REAVEL;
        let computerGuess = this.outguessingEngine.guessHumansNextInput();
        
        if (humanChoice === computerGuess) {
            scoreComputer += 1;
        } else {
            scoreHuman += 1;
        }

        // Technically the machine needs to guess first, so the very first guess by the machine should truly be random
        // therefore, we should not update the machine's memory until after the human has made at least one choice, otherwise
        // there machine is 'cheating'
        this.outguessingEngine.rememberHumanInput(humanChoice);

        this.setState({
            humanChoice: humanChoice,
            scoreComputer: scoreComputer,
            scoreHuman: scoreHuman,
            computerGuess: computerGuess,
            stage: nextStage
        });
    }

    render() {
        let {
            gameInSession,
            stage,
            humanChoice,
            computerGuess,
            roundNumber,
            scoreHuman,
            scoreComputer
        } = this.state;

        let startBtnClass = 'btn btn-success';

        if (gameInSession) {
            startBtnClass += ' d-none';
        }
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Mind Reading Machine</h1>
                </header>
                <ul className="d-inline-block instructions text-left">
                    <li>Click "Start Game".</li>
                    <li>The machine will guess whether you will click "1" or "0".</li>
                    <li>The machine receives a point if it guesses correctly.</li>
                    <li>Otherwise, you receive a point.</li>
                    <li>First to 10 points wins.</li>
                </ul>

                <ScoreBoard
                    roundNumber={roundNumber}
                    scoreComputer={scoreComputer}
                    scoreHuman={scoreHuman}
                />

                <StatusMessage
                    stage={stage}
                    humanChoice={humanChoice}
                    computerGuess={computerGuess}
                    isFinalRound={roundNumber === this.maxRoundNumber}
                />

                {gameInSession ? (
                    <Inputs handleHumanAction={this.handleHumanAction} />
                ) : (
                    <button onClick={this.clickStartButton} className={startBtnClass}>
                        Start Game
                    </button>
                )}
            </div>
        );
    }
}

export default App;
