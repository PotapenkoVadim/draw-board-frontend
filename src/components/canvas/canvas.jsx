import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import canvasState from '@/store/canvas';
import toolState from '@/store/tool';
import Brush from '@/tools/brush';
import styles from './canvas.module.scss';

export default observer(function () {
  const canvasRef = useRef();

  const saveUserAction = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  return (
    <div className={styles['canvas']}>
      <canvas
        onMouseDown={saveUserAction}
        ref={canvasRef}
        className={styles['canvas__board']}
        width={600}
        height={400}
      />
    </div>
  );
});
