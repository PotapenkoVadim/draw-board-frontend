import Brush from './brush';

export default class Eraser extends Brush {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);

    this.name = 'eraser';
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'eraser',
            x: event.pageX - event.target.offsetLeft,
            y: event.pageY - event.target.offsetTop,
            color: '#ffffff',
          },
        })
      );
    }
  }
}
