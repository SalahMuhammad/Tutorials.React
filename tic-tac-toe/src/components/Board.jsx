import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  const obj = calculateWinner(squares);
  let status;
  
  obj
    ? status = "Winner: " + obj.winner
    : squares.every((row) => row.every((col) => col !== null))
        ? status = "It's a draw!"
        : status = "Next player: " + (xIsNext ? "X" : "O")  

  function handleClick(row, col) {
    if (calculateWinner(squares) || squares[row][col]) {
      return;
    }

    const nextSquares = squares.map((row) => row.slice());

    xIsNext
      ? nextSquares[row][col] = "X"
      : nextSquares[row][col] = "O"

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, columnIndex) => {
            return (
              <Square 
                key={columnIndex}
                value={value} 
                onSquareClick={() => handleClick(rowIndex, columnIndex)} 
                isWinnerSquare={obj && JSON.stringify(obj.squares).includes(JSON.stringify([rowIndex, columnIndex]))}
              />
            )
          })}
        </div>
      ))}
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
    const [a, b, c] = lines[i]
    const [aa, bb, cc] = [[Math.floor(a / 3), a % 3], [Math.floor(b / 3), b % 3], [Math.floor(c / 3), c % 3]]

    if (squares[aa[0]][aa[1]] && squares[aa[0]][aa[1]] == squares[bb[0]][bb[1]] && squares[aa[0]][aa[1]] == squares[cc[0]][cc[1]]) {
      return {squares: [aa, bb, cc], winner: squares[aa[0]][aa[1]]}
    }
  }

  return null;
}
