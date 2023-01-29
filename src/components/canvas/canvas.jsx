import React from 'react';
import styles from './canvas.module.scss';

export default function Canvas() {
  return (
    <div className={styles['canvas']}>
      <canvas
        className={styles['canvas__board']}
        width={600}
        height={400} />
    </div>
  );
}