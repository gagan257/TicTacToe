import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
      winner: null, // New state to store the winner
      countdown: 3, // Countdown value
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      winner: calculateWinner(squares), // Update the winner state
    });
  };

  componentDidUpdate() {
    const winner = this.state.winner;
    if (winner) {
      this.startCountdown();
    } else if (this.state.stepNumber === 9) {
      this.startCountdown();
    }
  }

  startCountdown = () => {
    const countdownInterval = setInterval(() => {
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      this.resetGame();
    }, 3000);
  };

  resetGame = () => {
    this.setState({
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
      winner: null,
      countdown: 3,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let status;
    if (this.state.winner) {
      status = `The Winner is ${this.state.winner}`;
    } else if (this.state.stepNumber === 9) {
      status = 'It\'s a tie!';
    } else {
      status = `Next player is ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board clickAction={(i) => this.handleClick(i)} squares={current.squares} />
        </div>

        <div className="game-info">
          {this.state.winner || this.state.stepNumber === 9 ? (
            <div>
              <div>{status}</div>
              <div>New game will start in {this.state.countdown} seconds</div>
            </div>
          ) : (
            <div>{status}</div>
          )}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const possibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < possibilities.length; i++) {
    const [a, b, c] = possibilities[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
