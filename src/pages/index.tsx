import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 2, 0, 0, 0, 0, 0],
    // [0, 0, 0, 2, 0, 0, 0, 0],
    // [0, 0, 0, 0, 2, 0, 0, 0],
    // [0, 0, 0, 0, 0, 2, 0, 0],
    // [0, 0, 0, 0, 0, 0, 2, 0],
    // [0, 0, 0, 0, 0, 0, 0, 1],

    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 1, 2, 0],
    [0, 0, 2, 1, 2, 2, 0, 0],
    [0, 2, 0, 2, 2, 2, 0, 0],
    [1, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 2, 2, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],

    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 1, 2, 0, 0, 0],
    // [0, 0, 0, 2, 1, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const directions: number[][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
    ];

    if (newBoard[y][x] === 0) {
      for (const w of directions) {
        if (board[y + w[0]] !== undefined && board[y + w[0]][x + w[1]] === 3 - turnColor) {
          for (let i = 2; i < 9; i++) {
            if (board[y + w[0] * i] !== undefined && board[y + w[0] * i][x + w[1] * i] === 3 - turnColor ) { 
              continue;
            } else if (board[y + w[0] * i] === undefined || board[y + w[0] * i][x + w[1] * i] === 0) {
              break;
            } else {
              newBoard[y][x] = turnColor; 
              for (let z = 1; z < i; z++) {
                newBoard[y + w[0] * z][x + w[1] * z] = turnColor
            }
        // } else {
        //   // alert('無理')
        // }
      }
    } 
  }
    // setTurnColor(3 - turnColor)

    setBoard(newBoard);
  };
}
}

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
