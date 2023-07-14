import { useState } from 'react';

export const useGame = () => {
  let pass = 0;
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

  const flipPiece = (
    x: number,
    y: number,
    type: boolean,
    color: number,
    w: number[],
    i: number
  ) => {
    if (type) {
      newBoard[y][x] = color;
      for (let z = 1; z < i; z++) {
        newBoard[y + w[0] * z][x + w[1] * z] = color;
      }
      // setTurnColor(3 - color);
      // break;
    } else {
      if (newBoard[y][x] === 0) {
        newBoard[y][x] = 3;
      }

      // console.log('ひっくり返せる位置', y, x);
      // console.table(newBoard);
    }
  };

  const isContinue = (i: number, x: number, y: number, color: number, w: number[]): boolean => {
    return (
      newBoard[y + w[0] * i] !== undefined && newBoard[y + w[0] * i][x + w[1] * i] === 3 - color
    );
  };

  const isBreak = (i: number, x: number, y: number, w: number[]): boolean => {
    return (
      newBoard[y + w[0] * i] === undefined ||
      newBoard[x + w[1] * i] === undefined ||
      newBoard[y + w[0] * i][x + w[1] * i] % 3 === 0
    );
  };

  const flipPiece2 = (x: number, y: number, type: boolean, color: number, w: number[]) => {
    for (let i = 2; i < 9; i++) {
      if (isContinue(i, x, y, color, w)) {
        continue;
      } else if (isBreak(i, x, y, w)) {
        break;
      } else {
        flipPiece(x, y, type, color, w, i);
      }
    }
  };

  const changeBoard = (x: number, y: number, type: boolean, color: number) => {
    if (newBoard[y][x] === 0) {
      for (const w of directions) {
        if (newBoard[y + w[0]] !== undefined && newBoard[y + w[0]][x + w[1]] === 3 - color) {
          // 隣が相手の色だったら
          flipPiece2(x, y, type, color, w);
        }
      }
    }
  };

  const countCandidates = () => {
    let candidate = 0;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (newBoard[y][x] === 3) {
          candidate++;
        }
      }
    }
    return candidate;
  };

  // パスの処理を行う関数を作成します。
  const handlePass = () => {
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
  };

  const Pass = () => {
    const candidate = countCandidates();
    if (candidate !== 0) {
      console.log('ゲーム続行');
      pass = 0;
      setTurnColor(3 - turnColor);
      setBoard(newBoard);
    } else {
      handlePass();
    }
  };

  // 新しいボードのクリア処理
  const clearNewBoard = () => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        newBoard[y][x] = newBoard[y][x] % 3; // 3 -> 0にしている
      }
    }
  };

  // ボードの変更処理
  const updateBoard = (color: number) => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        changeBoard(x, y, false, color);
      }
    }
  };

  const onClick = (x: number, y: number) => {
    if (board[y][x] === 3) {
      console.log('クリック位置', x, y);
      clearNewBoard();
      changeBoard(x, y, true, turnColor);
      updateBoard(3 - turnColor);
      Pass();
    } else {
      alert('置けないよん');
    }
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

  return { board, countsMessage, onClick };
};
