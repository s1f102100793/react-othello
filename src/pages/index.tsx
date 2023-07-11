import { useState } from 'react';
import styles from './index.module.css';
import { Cell } from '../components/Cell';
let pass = 0;
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

    // [0, 0, 0, 1, 1, 1, 1, 1],
    // [0, 0, 0, 2, 2, 2, 2, 1],
    // [0, 0, 0, 3, 3, 3, 2, 1],
    // [0, 0, 0, 0, 0, 3, 3, 1],
    // [0, 0, 0, 0, 0, 0, 0, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0],
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
                // setTurnColor(3 - color);
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
    // if (pass !== 2) {
    if (board[y][x] === 3) {
      console.log('クリック位置', x, y);
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          newBoard[y][x] = newBoard[y][x] % 3;
          // 3 -> 0にしている
        }
      }
      changeBoard(x, y, true, turnColor);
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          changeBoard(x, y, false, 3 - turnColor);
          //
        }
      }
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
        pass = 0;
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
      } else {
        console.log('パス');
        pass++;
        alert('パスです');
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            changeBoard(x, y, false, turnColor);
          }
        }
        setTurnColor(turnColor);
        setBoard(newBoard);
      }
    } else {
      alert('置けないよん');
      //   }
      // } else (
      //   console.log('ゲーム終了')
      // )
    }
    //
    //       console.log("pass:",pass)
    //
    //       console.log("pass:",pass)
    //       if (pass === 2) {
    //         console.log('ゲーム終了')
    //         alert('ゲーム終了')
    //       }
  };

  const countStones = (color: number, board: number[][]) => {
    let count = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell === color) {
          count++;
        }
      }
    }
    return count;
  };

  const blackCount = countStones(1, board);
  const whiteCount = countStones(2, board);
  const countsMessage = `ユーザー${turnColor}のターン
  黒: ${blackCount}, 白: ${whiteCount}`;

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell color={color} key={`${x}-${y}`} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
      <div className={styles.counts}>{countsMessage}</div>
    </div>
  );
};

export default Home;
