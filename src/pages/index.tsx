import { useState } from 'react';
import styles from './index.module.css';
const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],

    // [0, 0, 0, 0, 0, 3, 1, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 3, 0, 0, 0],
    // [0, 0, 0, 1, 2, 3, 0, 0],
    // [0, 0, 3, 2, 1, 0, 0, 0],
    // [0, 0, 0, 3, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
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

  const changeBoard = (x: number, y: number, type: boolean, color: number) => {
    if (newBoard[y][x] === 0) {
      for (const w of directions) {
        if (newBoard[y + w[0]] !== undefined && newBoard[y + w[0]][x + w[1]] === 3 - color) {
          // 隣が相手の色だったら
          for (let i = 2; i < 9; i++) {
            if (
              newBoard[y + w[0] * i] !== undefined &&
              newBoard[y + w[0] * i][x + w[1] * i] === 3 - color
              // その隣も相手の色だったらもう一度繰り返す
            ) {
              continue;
            } else if (
              newBoard[y + w[0] * i] === undefined ||
              newBoard[x + w[1] * i] === undefined ||
              newBoard[y + w[0] * i][x + w[1] * i] % 3 === 0
              // 続けていってundefinedか空白に当たったら終わり
            ) {
              break;
            }
            // それ以外の相手のコマのその先に自分と同じ色のコマがあったら
            else {
              if (type) {
                newBoard[y][x] = color;
                for (let z = 1; z < i; z++) {
                  newBoard[y + w[0] * z][x + w[1] * z] = color;
                }
                setTurnColor(3 - color);
                break;
              } else {
                if (newBoard[y][x] === 0) {
                  newBoard[y][x] = 3;
                }

                // console.log('ひっくり返せる位置', y, x);
                // console.table(newBoard);
              }
            }
          }
        }
      }
    }
  };

  const onClick = (x: number, y: number) => {
    if (board[y][x] === 3) {
      console.log('クリック位置', x, y);
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          newBoard[y][x] = newBoard[y][x] % 3;
        }
      }
      changeBoard(x, y, true, turnColor);
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          changeBoard(x, y, false, 3 - turnColor);
        }
      }
      setBoard(newBoard);
    }
  };

  let candidate = 0;

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (newBoard[y][x] === 3) {
        candidate++;
      }
    }
  }
  if (candidate !== 0) {
    console.log('ゲーム続行');
    onClick(x, y);
  } else {
    console.log('パス');
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
                  style={{ background: color === 3 ? '#555555' : color === 1 ? '#000' : '#fff' }}
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
