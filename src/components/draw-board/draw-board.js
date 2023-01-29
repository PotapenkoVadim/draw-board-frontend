import React from 'react';
import Canvas from '@/components/canvas/canvas';
import Toolbar from '@/components/toolbar/toolbar';
import SettingBar from '@/components/setting-bar/setting-bar';

import styles from './draw-board.module.scss';

export default function DrawBoard() {
  return (
    <div className={styles['draw-board']}>
      <div className={styles['draw-board__toolbar']}>
        <Toolbar />
        <SettingBar />
      </div>

      <Canvas />
    </div>
  );
}
