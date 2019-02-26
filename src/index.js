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
 * Owns the state of the Squares to provide turn switching
 * and identify a winner in winning games
 */
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
                <Square
                    value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
                />
               );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
                <div>
                    <div className="status">{status}</div>
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
    render() {
        return (
                <div className="game">
                    <div className="game-board">
                        <Board />
                    </div>
                    <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
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
