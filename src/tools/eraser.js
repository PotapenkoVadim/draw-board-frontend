import Brush from './brush';

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas);
  }

  draw(x, y) {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 25;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
