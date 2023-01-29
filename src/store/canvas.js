import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.canvas.style  = '100%';
    this.canvas.style = '100%';
    this.canvas.width  = window.innerWidth - 10;
    this.canvas.height = window.innerHeight - 10;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    let ctx = this.canvas.getContext('2d');

    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();

      this.redoList.push(this.canvas.toDataURL());

      let image = new Image();
      image.src = dataUrl;
      image.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d');

    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();

      this.undoList.push(this.canvas.toDataURL());

      let image = new Image();
      image.src = dataUrl;
      image.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
