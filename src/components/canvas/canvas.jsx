import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import canvasState from '@/store/canvas';
import toolState from '@/store/tool';
import Brush from '@/tools/brush';
import Painter from '@/module/painter';
import { configuration } from '@/configuration';
import styles from './canvas.module.scss';

export default observer(function () {
  const canvasRef = useRef();
  const params = useParams();

  const saveUserAction = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const drawHandler = (message) => {
    const figure = message.figure;
    const ctx = canvasRef.current.getContext('2d');
    const painter = new Painter(figure);

    painter.draw(ctx);
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(configuration.serverURL);
      toast.success('Connection has run', configuration.toast);

      toolState.setTool(new Brush(canvasRef.current, socket, params.id));

      canvasState.setSocket(socket);
      canvasState.setSessionID(params.id);

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection',
          })
        );

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.method) {
            case 'connection':
              toast.success(
                `User ${message.username} has connected`,
                configuration.toast
              );
              break;

            case 'draw':
              drawHandler(message);
              break;
          }
        };
      };
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
