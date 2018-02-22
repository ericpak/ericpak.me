import React, {Component} from "react";
import classNames from "classnames";


class PaintCanvas extends Component {
  getClassName() {
    return classNames("PaintCanvas");
  }

  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      paintCanvas: this.refs.paintCanvas,
      c: undefined,
      cursorEventRadius: 20,
      color: 'green',
    }
  }

  // Mousemove event listener
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  // If canvas mounts
  componentDidMount() {
    this.state.paintCanvas = this.refs.paintCanvas;
    this.state.paintCanvas.width = window.innerWidth;
    this.state.paintCanvas.height = window.innerHeight;
    this.state.c = this.state.paintCanvas.getContext("2d");

    //////////////////////////////////////////////////////////////////////
    // the radius around the cursor that will interact with the canvas
    //////////////////////////////////////////////////////////////////////
    //var cursorEventRadius = 100;

    window.addEventListener('resize', this.resizeWindow.bind(this));
    this.state.c.font = "40px verdana";
    this.state.c.fillText("Hi,", 100, 100);
    this.state.c.font = "20px verdana";
    this.state.c.fillText("my name is", 165, 100);
    this.state.c.font = "70px verdana";
    this.state.c.fillText("Eric Pak", 165, 165);
    this.state.c.beginPath();
    this.state.c.arc(100, 100, 50, 0, Math.PI, false);
    this.state.strokeStyle = 'green';
    //this.state.c.stroke();
  }

  reset(){
    this.state.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.state.c.font = "40px verdana";
    this.state.c.fillText("Hi,", 100, 100);
    this.state.c.font = "20px verdana";
    this.state.c.fillText("my name is", 165, 100);
    this.state.c.font = "70px verdana";
    this.state.c.fillText("Eric Pak", 165, 165);
  }

  resizeWindow(){
    this.state.paintCanvas.width = window.innerWidth;
    this.state.paintCanvas.height = window.innerHeight;
  }

  animate(cursorEventRadius) {
    window.requestAnimationFrame(() => {
      this.animate(cursorEventRadius);
    });
    this.state.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.state.c.beginPath();
    this.state.c.arc(this.state.x, this.state.y, this.state.cursorEventRadius, 0, Math.PI *2, false);
    this.state.c.strokeStyle = this.state.color;
    this.state.c.stroke();
  }

  render() {
    return (
      <div className={this.getClassName()} onMouseMove={this._onMouseMove.bind(this)}>
          <canvas ref="paintCanvas" id={this.getClassName() + "_canvas"} className={this.getClassName() + "_canvas"} />
      </div>
    )
  }
}

export default PaintCanvas;
