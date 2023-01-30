import Brush from '@/tools/brush';
import Rect from '@/tools/rect';
import Circle from '@/tools/circle';
import Line from '@/tools/line';
import Eraser from '@/tools/eraser';

export default class Painter {
  constructor(figure) {
    this.figure = figure;
  }

  draw(ctx) {
    switch (this.figure.type) {
      case 'brush':
        Brush.draw(ctx, this.figure);
        break;

      case 'rect':
        Rect.staticDraw(ctx, this.figure);
        break;

      case 'circle':
        Circle.staticDraw(ctx, this.figure);
        break;

      case 'line':
        Line.staticDraw(ctx, this.figure);
        break;

      case 'eraser':
        Eraser.draw(ctx, this.figure);
        break;

      case 'finish':
        ctx.beginPath();
        break;
    }
  }
}
