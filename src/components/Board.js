import React from 'react';
import Square from './Square.js';

class Board extends React.Component {
    renderSquare(i, isWinner) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} isWinner={isWinner} />;
    }

    render() {
        const valueSquares = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ];
        const listWinners = this.props.winner;

        return (
            <div>
                {
                    valueSquares.map((value, index) => {
                        return <div className="board-row" key={index}>
                            {
                                value.map((valor, posicion) => {
                                    const isWinner = (listWinners != null && (valor === listWinners[0] || valor === listWinners[1] || valor === listWinners[2])) ? true : false
                                    return <b key={posicion}>{this.renderSquare(valor, isWinner)}</b>
                                })
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Board;