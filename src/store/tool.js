import { makeAutoObservable, observable } from 'mobx';

class ToolState {
  tool = null;

  constructor() {
    makeAutoObservable(this, {
      tool: observable,
    });
  }

  setTool(tool) {
    this.tool = tool;
  }

  setFillColor(color) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }

  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
