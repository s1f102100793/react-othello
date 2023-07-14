// import { useState } from 'react';
import { Cell } from '../components/Cell';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { board, countsMessage, onClick } = useGame();

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
