import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const winner = calculateWinner(history[currentMove]);
  const squares = history[currentMove];
  const status = winner ? `Ganador: ${winner}` : `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    
    const newHistory = history.slice(0, currentMove + 1).concat([newSquares]);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
  };

  return (
    <div className="game-container">
      <div className="game">
        <div className="status">{status}</div>
        <Board squares={squares} onClick={handleClick} />
        <button className="reset" onClick={handleReset}>Reiniciar Juego</button>
      </div>
  
      {/* Contenedor del historial a la derecha */}
      <div className="history-container">
        <h2>Historial de movimientos</h2>
        <div className="history-buttons">
          {history.map((moveSquares, move) => {
            const desc = move ? `Ir a la jugada #${move}` : 'Ir al inicio del juego';
            return (
              <button key={move} onClick={() => jumpTo(move)} className="history-btn">
                {desc}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );  
};

export default App;