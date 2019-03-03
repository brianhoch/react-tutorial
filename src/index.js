import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * A square in the board. Event handlers are
 * covered in the Board so we can force turns and
 * calculate the winner.
 * @param {object} props - from caller
 * @param props.onClick - onClick handler defined in caller
 * @param props.value - current value in square ('X', 'O', null)
 */
function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**
 * Board on which the game is played
 * Receives state of the Squares from Game.
 */
class Board extends React.Component {

  /**
   * Display this square's value, send along click events
   * @param i - index of current square in the Board's squares prop
   */
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  /**
   * Start game with an empty board in the first history entry
   * and it's 'X's turn.
   */
  constructor(props) {
      super(props);
      this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
      };
  }

  /**
   * If the game isn't over and this square isn't taken
   * add the current player's mark to the square's state;
   * add the changed board state to the game's history;
   * increment the step number;
   * flip which player's turn it is.
   * @param i - id of the square clicked
   */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * Jump to a specific step in the game history
   * from another step in the history
   * @param step - the id of the step to jump to
   */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
           <div>{status}</div>
           <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/**
 * Determine whether someone has won
 * @param squares - current state of the squares on the game board
 * @returns squares[] - player that won (X or O)
 */
function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
      if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) {
        return squares[a];
      }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
