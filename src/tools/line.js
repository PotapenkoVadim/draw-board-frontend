import Tool from './tool';

export default class Line extends Tool {
  constructor(canvas) {
    super(canvas);

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
}
