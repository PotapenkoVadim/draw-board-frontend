import React from 'react';
import Button from '@/components/ui-kit/button/button';
import Palette from '@/components/ui-kit/palette/palette';
import toolState from '@/store/tool';
import canvasState from '@/store/canvas';
import Brush from '@/tools/brush';
import Rect from '@/tools/rect';
import Circle from '@/tools/circle';
import Eraser from '@/tools/eraser';
import Line from '@/tools/line';
import styles from './toolbar.module.scss';

export default function Toolbar() {
  const selectBrushTool = () => {
    toolState.setTool(new Brush(canvasState.canvas));
  };

  const selectRect = () => {
    toolState.setTool(new Rect(canvasState.canvas));
  };

  const selectCircle = () => {
    toolState.setTool(new Circle(canvasState.canvas));
  };

  const selectEraser = () => {
    toolState.setTool(new Eraser(canvasState.canvas));
  };

  const selectLine = () => {
    toolState.setTool(new Line(canvasState.canvas));
  };

  return (
    <div className={styles['toolbar']}>
      <Button onClick={selectBrushTool} variant="brush" />
      <Button onClick={selectRect} variant="square" />
      <Button onClick={selectCircle} variant="circle" />
      <Button onClick={selectEraser} variant="highlighter" />
      <Palette />

      <Button onClick={selectLine} variant="line" />
      <Button variant="undo" />
      <Button variant="redo" />
      <Button variant="save" />
    </div>
  );
}
