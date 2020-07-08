import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


  function Square(props){
     
      const isWinner= props.isWinner ? "squareWinner square" : "square"
      return (
          <button className={isWinner} onClick={props.onClick}>
            {props.value}
          </button>
      );
  }
  class Board extends React.Component {
    renderSquare(i,isWinner) {
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} isWinner={isWinner} />;
    }
    
    render() {
        const valueSquares=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
        ];
        const listWinners = this.props.winner;
        
    return (
      <div>
        {
          valueSquares.map((value, index) => {
            return <div className="board-row" key={index}>
                    {
                        value.map((valor,posicion) => {
                            const isWinner= (listWinners!=null &&(valor===listWinners[0] || valor===listWinners[1] || valor===listWinners[2])) ? true : false
                            return <b key={posicion}>{this.renderSquare(valor,isWinner)}</b>
                        })
                    }
                   </div>
           })
          }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      isAscendente: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const ubicaciones = [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        historialMovimientos: ubicaciones[i],
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  cambiarOrden() {
    this.setState({
      isAscendente: !this.state.isAscendente
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + " Columna: " + history[move].historialMovimientos[0] + " Fila : " + history[move].historialMovimientos[1] :
        'Go to game start';
      //const classButton = move === this.state.stepNumber ? "button-bold" : "";
      var classButton = "";
      if (move === this.state.stepNumber) {
        classButton = "button-bold";
      }

      return (
        <li key={move}>
          <button className={classButton} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });


    let status;
    
    
    if (winner) {
      status = 'Winner: ' + current.squares[winner[0]];
    } else if (this.state.stepNumber === 9) {
      status = "El juego termino, es un empate!"
    } else
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    const isAsendente = this.state.isAscendente;
    if (!isAsendente) {
      moves.reverse();
    }
    return (
      <div className="game" >
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} winner={winner}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.cambiarOrden()}>
            {isAsendente ? "Ordenar Desendente" : "Ordenar Ascendente"}
          </button>
          <ol>{moves}</ol>

        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //return squares[a];
      return lines[i];
    }
  }
  return null;
}

// ========================================
ReactDOM.render(
  <Game />,
  //<ShoppingList name="Mark" />,
  document.getElementById('root')
);
