import { useState } from 'react'
import Board from './components/Board';

export default function Game() {
  const [history, setHistory] = useState([
    [
      Array(3).fill(null),
      Array(3).fill(null),
      Array(3).fill(null),
    ]
  ])
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscendinghistoryOrder, setIsAscendingHistoryOrder] = useState(false)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;

    move = isAscendinghistoryOrder ? history.length - 1 - move : move
    move > 0
      ? description = 'Go to move #' + (move + 1)
      : description = 'Go to game start'

    return (
      <li key={move}>
        {currentMove == move 
          ? `You are at move #${move + 1}` 
          : <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscendingHistoryOrder(!isAscendinghistoryOrder)}>Reverse order</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
