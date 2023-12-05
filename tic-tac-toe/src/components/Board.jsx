import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  const obj = calculateWinner(squares);
  let status;
  
  obj
    ? status = "Winner: " + obj.winner
    : squares.every(square => square !== null)
        ? status = "It's a draw!"
        : status = "Next player: " + (xIsNext ? "X" : "O")  

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    xIsNext
      ? nextSquares[i] = "X"
      : nextSquares[i] = "O"

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => 
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => {
            const squareIndex = row * 3 + col
            return (
              <Square
                key={col} 
                value={squares[squareIndex]} 
                onSquareClick={() => handleClick(squareIndex)} 
                isWinnerSquare={obj && obj.line ? obj.line.includes(squareIndex) : false}
              />
            )
          })}
        </div> 
      )}
    </>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {line: lines[i], winner: squares[a]};
    }
  }

  return null;
}