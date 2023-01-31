import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import canvasState from '@/store/canvas';
import toolState from '@/store/tool';
import Brush from '@/tools/brush';
import Painter from '@/module/painter';
import Toast from '@/service/toast';
import WebsocketService from '@/service/websocket';
import styles from './canvas.module.scss';

export default observer(function () {
  const canvasRef = useRef();
  const params = useParams();

  const saveUserAction = () =>
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  const drawHandler = (message) => {
    const figure = message.figure;
    const ctx = canvasRef.current.getContext('2d');
    const painter = new Painter(figure);

    painter.draw(ctx);
  };

  useEffect(() => canvasState.setCanvas(canvasRef.current), []);

  useEffect(() => {
    if (canvasState.username) {
      const socketService = new WebsocketService();

      toolState.setTool(
        new Brush(canvasRef.current, socketService.socket, params.id)
      );

      canvasState.setSocket(socketService.socket);
      canvasState.setSessionID(params.id);

      const data = {
        id: params.id,
        username: canvasState.username,
        method: 'connection',
      };

      const handleError = () => Toast.error('server_error');
      const handleMessage = (event) => {
        const message = JSON.parse(event.data);

        switch (message.method) {
          case 'connection':
            Toast.success(`User ${message.username} has connected`);
            break;

          case 'draw':
            drawHandler(message);
            break;
        }
      };

      socketService.open(data, handleMessage, handleError);
    }
  }, [canvasState.username]);

  return (
    <div className={styles['canvas']}>
      <canvas
        onMouseDown={saveUserAction}
        ref={canvasRef}
        className={styles['canvas__board']}
        width={600}
        height={400}
      />

      <Toaster />
    </div>
  );
});
