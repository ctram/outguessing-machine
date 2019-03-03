import React, { Component } from 'react';
import { ScoreBoard } from './ScoreBoard';
import { Inputs } from './Inputs';
import { OutguessingEngine } from './lib/outguess-engine';
import { StrategyTwoInARow } from './lib/strategies';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    strategies = [new StrategyTwoInARow()];

    this.outguessingEngine = new OutguessingEngine(strategies);

    this.state = {
      gameInSession: false,
      roundNumber: 0,
      scoreHuman: 0,
      scoreComputer: 0,
      stage: ''
    }
  }

  clickStartButton() {
    this.startGame();
  }

  startGame() {
    this.computerGuesses();

    this.setState({
      gameInSession: true, scoreHuman: 0, scoreComputer: 0, stage: 'humanGuesses'
    });
  }

  computerGuesses() {
    this.nextGuess = this.outguessingEngine.guessHumansNextInput();
  }

  render() {
    let { gameInSession, stage } = this.state;

    let startBtnClass = 'btn btn-success';

    if (gameInSession) {
      startBtnClass += ' d-none';
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Outguessing Machine</h1>
        </header>
        <p className="instructions text-left d-flex justify-content-center">
          <ul className="d-inline-block">
            <li>Click "Start Game".</li>
            <li>The machine will guess whether you will click "1" or "0".</li>
            <li>The machine receives a point if it guesses correctly.</li>
            <li>Otherwise, you receive a point.</li>
            <li>First to 10 points wins.</li>
          </ul>
        </p>

        <ScoreBoard />

        <StatusMessage stage={stage} />

        {gameInSession ? <Inputs /> : <button onClick={this.clickStartButton} className={startBtnClass}>Start Game</button>}
      </div>
    );
  }
}

export default App;
