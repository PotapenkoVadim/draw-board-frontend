import Brush from './brush';

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas);

    this.name = 'eraser';
  }

  draw(x, y) {
    this.ctx.strokeStyle = '#ffffff';

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
