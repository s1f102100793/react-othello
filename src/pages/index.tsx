import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [cellColor, setCellColor] = useState('');
  const [board, setBoard] = useState([
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 2, 0, 0, 0, 0, 0],
    // [0, 0, 0, 2, 0, 0, 0, 0],
    // [0, 0, 0, 0, 2, 0, 0, 0],
    // [0, 0, 0, 0, 0, 2, 0, 0],
    // [0, 0, 0, 0, 0, 0, 2, 0],
    // [0, 0, 0, 0, 0, 0, 0, 1],

    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 2, 0, 0, 0, 1, 2, 0],
    // [0, 0, 2, 1, 2, 2, 0, 0],
    // [0, 2, 0, 2, 2, 2, 0, 0],
    // [1, 2, 2, 2, 2, 2, 2, 0],
    // [0, 0, 2, 0, 0, 2, 0, 0],
    // [0, 2, 0, 0, 0, 2, 2, 0],
    // [1, 0, 0, 0, 0, 0, 0, 1],

    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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
          // 隣が相手の色だったら
          for (let i = 2; i < 9; i++) {
            if (
              board[y + w[0] * i] !== undefined &&
              board[y + w[0] * i][x + w[1] * i] === 3 - turnColor
              // その隣も相手の色だったらもう一度繰り返す
            ) {
              continue;
            } else if (
              board[y + w[0] * i] === undefined ||
              board[y + w[0] * i][x + w[1] * i] === 0
              // 続けていってundefinedか空白に当たったら終わり
            ) {
              console.log(y + w[0] * i, x + w[1] * i);
              break;
            }
            // それ以外の相手のコマのその先に自分と同じ色のコマがあったら
            else {
              newBoard[y][x] = turnColor;
              setCellColor('yellow');
              // newBoard[y][x] = 3;
              for (let z = 1; z < i; z++) {
                newBoard[y + w[0] * z][x + w[1] * z] = turnColor;
              }
              setBoard(newBoard);
              setTurnColor(3 - turnColor);
              break;
            }
          }
        }
      }
    } else {
      alert('置けないよん');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => onClick(x, y)}
              style={{ backgroundColor: cellColor }}
            >
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
