import React, { useState, useEffect } from 'react';
import './app.css';

type Player = 'O' | 'X';

function App() {
  const [winner, setWinner] = useState<Player | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [turn, setTurn] = useState<Player>('O');

  const [marks, setMarks] = useState<{ [key: string]: Player }>({});
  const gamerOver = !!winner || !!draw;

  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {
    if (marks[index] || gamerOver) {
      return;
    }
    setMarks((prev) => ({ ...prev, [index]: turn }));
    setTurn((prev) => (prev === 'O' ? 'X' : 'O'));
  };

  const getCellPlayer = (index: number) => {
    if (!marks[index]) {
      return;
    }

    return marks[index];
  };

  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (const line of victoryLines) {
      const [a, b, c] = line;

      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return marks[a];
      }
    }
  };

  useEffect(() => {
    const winner = getWinner();

    if (winner) {
      setWinner(winner);
    } else {
      if (Object.keys(marks).length === 9) {
        setDraw(true);
      }
    }
  }, [marks]);

  const reset = () => {
    setTurn(marks[0] === 'O' ? 'X' : 'O');
    setMarks({});
    setWinner(null);
    setDraw(null);
  };

  return (
    <div className="container">
      {winner && <h1>{winner} ganhou</h1>}
      {draw && <h1>Empate</h1>}

      {!gamerOver && <p>É a vez de {turn}</p>}
      {gamerOver && <button onClick={reset}>Play Again</button>}
      <div className={`board ${gamerOver ? 'gameOver' : null}`}>
        {getSquares().map((_, i) => (
          <div
            key={i}
            className={`cell ${getCellPlayer(i)}`}
            onClick={() => play(i)}
          >
            {marks[i]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
