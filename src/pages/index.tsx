import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 0],
    [0, 2, 0, 1, 2, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
  ]);

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    // const directions: number[][] = [
    //   [-1, -1],
    //   [-1, 0],
    //   [-1, 1],
    //   [0, -1],
    //   [0, 1],
    //   [1, 1],
    //   [1, 0],
    //   [1, -1],
    // ]; 

    // 下が相手の色だったら置ける
    if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
      const Y = board.map((key) => key[0]);
      console.log(Y)
      for (let i = 0; i < 9; i++) {
        if (board[y + 1 + i] !== undefined && board[y + 1 + i][x] === turnColor) {
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
        }
        }
      

      // if (board[y + 2][x] >= turnColor) {
      //   newBoard[y][x] = turnColor;
      //   setTurnColor(2 / turnColor);
      // } else {
      //   alert('そこは置けねーよバーカ！')
      // }
      
      // if (turnColor === 1) {
      //   setTurnColor(2);
      // } else {
      //   setTurnColor(1);
      // }
    // } else if (board[y - 1] !== undefined && board[y - 1][x] === 3 - turnColor && board[y - 2][x] === 2 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } else if (board[x + 1] !== undefined && board[y][x + 1] === 3 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } else if (board[x - 1] !== undefined && board[y][x - 1] === 3 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } else if (board[y - 1][x - 1] !== undefined && board[y - 1][x - 1] === 3 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } else if (board[y - 1][x + 1] !== undefined && board[y - 1][x + 1] === 3 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } else if (board[y + 1][x - 1] !== undefined && board[y + 1][x - 1] === 3 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } else if (board[y + 1][x + 1] !== undefined && board[y + 1][x + 1] === 3 - turnColor) {
    //   newBoard[y][x] = turnColor;
    //   setTurnColor(2 / turnColor);
    // } 
    } else {
      alert('そこは置けねーよバーカ！')
    }

    // turnColor === setTurnColor(1) setTurnColor(2);
    setBoard(newBoard);
  };

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
