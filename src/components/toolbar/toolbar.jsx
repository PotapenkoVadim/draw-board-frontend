import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@/components/ui-kit/button/button';
import InputField from '@/components/ui-kit/input-field/input-field';
import toolState from '@/store/tool';
import canvasState from '@/store/canvas';
import Brush from '@/tools/brush';
import Rect from '@/tools/rect';
import Circle from '@/tools/circle';
import Eraser from '@/tools/eraser';
import Line from '@/tools/line';
import styles from './toolbar.module.scss';

export default observer(function () {
  const selectBrushTool = () =>
    toolState.setTool(
      new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionID)
    );

  const selectRect = () =>
    toolState.setTool(
      new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionID)
    );

  const selectCircle = () =>
    toolState.setTool(
      new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionID)
    );

  const selectEraser = () =>
    toolState.setTool(
      new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionID)
    );

  const selectLine = () =>
    toolState.setTool(
      new Line(canvasState.canvas, canvasState.socket, canvasState.sessionID)
    );

  const changeColor = (event) => {
    toolState.setStrokeColor(event.target.value);
    toolState.setFillColor(event.target.value);
  };

  const undo = () => canvasState.undo();
  const redo = () => canvasState.redo();

  return (
    <div className={styles['toolbar']}>
      {toolState.tool && (
        <>
          <Button
            className={
              toolState.tool.name === 'brush'
                ? styles['toolbar__tool_active']
                : ''
            }
            onClick={selectBrushTool}
            variant="brush"
          />

          <Button
            className={
              toolState.tool.name === 'rect'
                ? styles['toolbar__tool_active']
                : ''
            }
            onClick={selectRect}
            variant="square"
          />

          <Button
            className={
              toolState.tool.name === 'circle'
                ? styles['toolbar__tool_active']
                : ''
            }
            onClick={selectCircle}
            variant="circle"
          />

          <Button
            className={
              toolState.tool.name === 'eraser'
                ? styles['toolbar__tool_active']
                : ''
            }
            onClick={selectEraser}
            variant="highlighter"
          />

          <InputField
            className={styles['toolbar__picker']}
            onChange={changeColor}
            type="color"
          />

          <Button
            className={
              toolState.tool.name === 'line'
                ? styles['toolbar__tool_active']
                : ''
            }
            onClick={selectLine}
            variant="line"
          />

          <Button onClick={undo} variant="undo" />
          <Button onClick={redo} variant="redo" />
          <Button variant="save" />
        </>
      )}
    </div>
  );
});
