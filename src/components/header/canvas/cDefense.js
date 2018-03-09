import React, {Component} from "react";
import classNames from "classnames";
import Circle from "./circle";

//////////////////////////////////////////////////////////////////////
// Color Wheel selected by the variable selectedColors
//////////////////////////////////////////////////////////////////////
const colors = [
  ['#324D5C', '#46B29D', '#F0CA4D', '#E37B40', '#F53855'], // Stoic Rainbow
  ['#F7F9FE', '#ECF1F2', '#DCE8EB', '#CBDBE0', '#BED2D9'], // Shades of White or grey
  ['#8EB9A8', '#FEFBD0', '#FDCFB7', '#F4828C', '#775D6A'], // Soft pastel
  ['#17468A', '#4C8DCA', '#78E5EB', '#F5F0F2', '#E12D53'], // red white and blue blue blue
  ['#FFBC67', '#DA727E', '#AC6C82', '#685C79', '#455C7B'], // Pink to blue + mango
];

//////////////////////////////////////////////////////////////////////
// Turns gravity on [true] or off [false]
//////////////////////////////////////////////////////////////////////
var isGravityOn = false;

//////////////////////////////////////////////////////////////////////
// Variables for the circles
//////////////////////////////////////////////////////////////////////
let selectedColors = Math.floor(Math.random()*colors.length);

//////////////////////////////////////////////////////////////////////
// The radius around the cursor that will interact with the canvas
//////////////////////////////////////////////////////////////////////
var cursorEventRadius = 100;

const navFooterHeight = 44;

// ballCanvas default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'hidden',
  opacity: 0,
}

class BallCanvas extends Component {
  getClassName() {
    return classNames("BallCanvas");
  }

  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      canvas: this.refs.canvas,
      c: undefined,
      circleArray: [],
    }
  }

  // Mousemove event listener
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  // Mouse click event listener
  _onMouseClick(e) {
    isGravityOn = true;
  }

  // If canvas mounts
  componentDidMount() {
    this.state.canvas = this.refs.canvas;
    this.state.canvas.width = window.innerWidth;
    this.state.canvas.height = window.innerHeight - navFooterHeight;
    this.state.c = this.state.canvas.getContext("2d");

    this.createCircles();
    window.addEventListener('resize', this.resizeWindow.bind(this));
    this.animate(cursorEventRadius);
  }

  // Resize canvas to fit window and recreate circles
  resizeWindow(){
    this.state.canvas.width = window.innerWidth;
    this.state.canvas.height = window.innerHeight - navFooterHeight;
    this.createCircles();
  }

  reset(){
    isGravityOn = false;
    selectedColors = Math.floor(Math.random()*colors.length);
    this.createCircles();
  }

  // Creates circles
  createCircles(){
    this.state.circleArray = [];

    for(var i = 0; i < this.props.variables.numberOfBalls; i++){
      let radius = (Math.random() * (this.props.variables.maxRadius - this.props.variables.minRadius)) + this.props.variables.minRadius;
      let x = Math.random() * (window.innerWidth - radius * 2) + radius;
      let y = Math.random() * (window.innerHeight - navFooterHeight - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * this.props.variables.maxVelocity;
      let dy = (Math.random() - 0.5) * this.props.variables.maxVelocity;
      let color = colors[selectedColors][Math.floor(Math.random()*colors[selectedColors].length)];
      this.state.circleArray.push(new Circle(this.state.c, radius, this.props.variables.enlargedRadius, x, y, dx, dy, color, this.props.variables.stroke));
    }
  }

    makeVisible(){
      divStyle = {
        ...divStyle,
        visibility: 'visible',
        opacity: 1,
      }
    }

    makeHidden(){
      divStyle = {
        ...divStyle,
        visibility: 'hidden',
        opacity: 0,
      }
    }

  // Recursive method
  animate(cursorEventRadius) {
    window.requestAnimationFrame(() => {
      this.animate(cursorEventRadius);
    });
    this.state.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i = 0; i < this.state.circleArray.length; i++){
      if(Math.abs(this.state.x - this.state.circleArray[i].state.x) < cursorEventRadius && Math.abs(this.state.y - this.state.circleArray[i].state.y) < cursorEventRadius && !isGravityOn)
        this.state.circleArray[i].enlargeRadius();
      else
        this.state.circleArray[i].shrinkRadius();
      this.state.circleArray[i].update(isGravityOn);
    }
  }

  render() {
    return (
      <div
        style={divStyle}
        className={this.getClassName()}
        onMouseMove={this._onMouseMove.bind(this)}
        onClick={this._onMouseClick.bind(this)}
      >
        <canvas ref="canvas" id={this.getClassName() + "_canvas"} className={this.getClassName() + "_canvas"} />
      </div>
    )
  }
}

export default BallCanvas;
