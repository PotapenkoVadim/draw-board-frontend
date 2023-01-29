import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import canvasState from '@/store/canvas';
import toolState from '@/store/tool';
import Brush from '@/tools/brush';
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

    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
    }
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(configuration.serverURL);
      console.log('Connection has run');

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
              console.log(`User ${message.username} has connected`);
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
    </div>
  );
});
