import Tool from './tool';

export default class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
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
      // this.draw(
      //   event.pageX - event.target.offsetLeft,
      //   event.pageY - event.target.offsetTop
      // );

      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'brush',
            x: event.pageX - event.target.offsetLeft,
            y: event.pageY - event.target.offsetTop,
          },
        })
      );
    }
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
