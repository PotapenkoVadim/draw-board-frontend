import Tool from './tool';

export default class Line extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

    this.name = 'line';
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(event) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'line',
          x: event.pageX - event.target.offsetLeft,
          y: event.pageY - event.target.offsetTop,
          cursorX: this.cursorX,
          cursorY: this.cursorY,
          color: this.ctx.fillStyle,
          strokeWidth: this.ctx.lineWidth,
        },
      })
    );
  }

  mouseDownHandler(event) {
    this.mouseDown = true;

    this.ctx.beginPath();

    this.cursorX = event.pageX - event.target.offsetLeft;
    this.cursorY = event.pageY - event.target.offsetTop;

    this.ctx.moveTo(this.x, this.y);

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.draw(
        event.pageX - event.target.offsetLeft,
        event.pageY - event.target.offsetTop
      );
    }
  }

  draw(x, y) {
    const image = new Image();
    image.src = this.saved;

    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();
      this.ctx.moveTo(this.cursorX, this.cursorY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx, figure) {
    ctx.strokeStyle = figure.color;
    ctx.lineWidth = figure.strokeWidth;

    ctx.beginPath();
    ctx.moveTo(figure.cursorX, figure.cursorY);
    ctx.lineTo(figure.x, figure.y);
    ctx.stroke();
  }
}
