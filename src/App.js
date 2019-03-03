import React, { Component } from 'react';

import { Inputs } from './components/Inputs';
import { ScoreBoard } from './components/ScoreBoard';
import { StatusMessage } from './components/StatusMessage';

import { OutguessingEngine } from './lib/outguessing-engine.js';
import { StrategyTwoInARow } from './lib/strategies.js';

import * as STAGES from './constants/stages';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        let strategies = [new StrategyTwoInARow()];

        this.outguessingEngine = new OutguessingEngine(strategies);

        // stages: ['prestart', 'humanGuesses', 'reveal', 'end']
        
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
        this.computerGuesses = this.computerGuesses.bind(this);
        this.handleHumanAction = this.handleHumanAction.bind(this);
    }

    clickStartButton() {
        this.startGame();
    }

    startGame() {
        this.computersGuess = this.computerGuesses();

        this.setState({
            gameInSession: true,
            scoreHuman: 0,
            scoreComputer: 0,
            stage: STAGES.STAGE_HUMAN_GUESSES,
            roundNumber: 1
        });
    }

    computerGuesses() {
        this.nextGuess = this.outguessingEngine.guessHumansNextInput();
    }

    handleHumanAction(humanChoice) {
        let nextRoundNumber = this.state.roundNumber + 1;
        let nextStage = nextRoundNumber <= this.maxRoundNumber ? STAGES.STAGE_REAVEL : STAGES.STAGE_END;
        
        this.setState({
            humanChoice: humanChoice,
            computerGuess: this.computerGuesses,
            roundNumber: nextRoundNumber,
            stage: nextStage
        });
    }

    render() {
        let { gameInSession, stage, humanChoice, computerGuess } = this.state;

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

                <ScoreBoard />

                <StatusMessage
                    stage={stage}
                    humanChoice={humanChoice}
                    computerGuess={computerGuess}
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
