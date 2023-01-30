import Tool from './tool';

export default class Circle extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

    this.name = 'circle';
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
          type: 'circle',
          x: this.startX,
          y: this.startY,
          radius: Math.sqrt(this.width ** 2 + this.height ** 2),
        },
      })
    );
  }

  mouseDownHandler(event) {
    this.mouseDown = true;

    this.ctx.beginPath();

    this.startX = event.pageX - event.target.offsetLeft;
    this.startY = event.pageY - event.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      let currentX = event.pageX - event.target.offsetLeft;
      let currentY = event.pageY - event.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      let radius = Math.sqrt(this.width ** 2 + this.height ** 2);

      this.draw(this.startX, this.startY, radius);
    }
  }

  draw(x, y, radius) {
    const image = new Image();
    image.src = this.saved;

    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx, figure) {
    ctx.beginPath();
    ctx.arc(figure.x, figure.y, figure.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
