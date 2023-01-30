import Tool from './tool';

export default class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

    this.name = 'brush';
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish',
        },
      })
    );
  }

  mouseDownHandler(event) {
    this.mouseDown = true;

    this.ctx.beginPath();
    this.ctx.moveTo(
      event.pageX - event.target.offsetLeft,
      event.pageY - event.target.offsetTop
    );
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'brush',
            x: event.pageX - event.target.offsetLeft,
            y: event.pageY - event.target.offsetTop,
            color: this.ctx.fillStyle,
            strokeWidth: this.ctx.lineWidth,
          },
        })
      );
    }
  }

  static draw(ctx, figure) {
    ctx.strokeStyle = figure.color;
    ctx.lineWidth = figure.strokeWidth;

    ctx.lineTo(figure.x, figure.y);
    ctx.stroke();
  }
}
