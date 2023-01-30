import Brush from './brush';

export default class Eraser extends Brush {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

    this.name = 'eraser';
  }

  draw(x, y) {
    this.ctx.strokeStyle = '#ffffff';

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
