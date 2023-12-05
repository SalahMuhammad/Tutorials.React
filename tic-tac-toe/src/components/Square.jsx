export default function Square({ value, onSquareClick, isWinnerSquare }) {  
  return (
    <button className={`square ${isWinnerSquare ? "winner-square" : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}