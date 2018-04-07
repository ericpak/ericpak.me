import React, {Component} from "react";
import classNames from "classnames";
import backgroundImage from "../../../Assets/media/images/mountainBear2.png";


//////////////////////////////////////////////////////////////////////
// Variables for the brush
//////////////////////////////////////////////////////////////////////
var mouse_down = false;

// Colors
var mutedGreen = "#7DC2AF";
var lightPurple = "#92A7C9";
var mutedBlue = "#7DB8C2";
var cobalt = '#2D5673';

// Paint Canvas default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'visible',
  opacity: 1,
}

// Drawing array to hold brush strokes
var drawing = [];
var currentPath = [];

// Nav and footer height
const navFooterHeight = 44;

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
      ctx: undefined,
      cursorEventRadius: 20,
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

  // Mousemove event listener
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    if(mouse_down){
      this.state.ctx.lineWidth = this.props.style.size;
      this.state.ctx.lineTo(this.state.x, this.state.y);
      this.state.ctx.stroke();
      // this.state.ctx.closePath();
      // this.state.ctx.beginPath();
      // this.state.ctx.moveTo(this.state.x, this.state.y);
      // this.drawCircle();
    }
  }

  // If canvas mounts
  componentDidMount() {
    this.state.paintCanvas = this.refs.paintCanvas;
    this.state.paintCanvas.width = window.innerWidth;
    this.state.paintCanvas.height = window.innerHeight - navFooterHeight;
    this.state.ctx = this.state.paintCanvas.getContext("2d");

    window.addEventListener('resize', this.resizeWindow.bind(this));
    this.defaultText();
  }

  defaultText(){
    // Creating inital background color/pattern
    this.state.ctx.fillStyle = mutedBlue;
    this.state.ctx.fillRect(0, 0, this.state.paintCanvas.width, this.state.paintCanvas.height);
    var gradient = this.state.ctx.createLinearGradient(0, 0, this.state.paintCanvas.width, this.state.paintCanvas.height);
    gradient.addColorStop(1, lightPurple);
    gradient.addColorStop(0, mutedGreen);
    for (var i = 0; i < this.state.paintCanvas.height/25; i++) {
      for (var j = 0; j < this.state.paintCanvas.width/25; j++) {
        this.state.ctx.strokeStyle = gradient;
        this.state.ctx.beginPath();
        this.state.ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        this.state.ctx.lineWidth = 3;
        this.state.ctx.stroke();
      }
    }

    // Background Image
    let img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      this.state.ctx.drawImage(img, (this.state.paintCanvas.width/2 - img.width/2), (this.state.paintCanvas.height/2 - img.height/2));
      this.state.ctx.fillStyle = cobalt;
      this.state.ctx.font = "40px verdana";
      this.state.ctx.fillText("Hi,", 80, 100);
      this.state.ctx.font = "70px verdana";
      this.state.ctx.fillText("Eric Pak", 145, 165);
      this.state.ctx.font = "20px verdana";
      this.state.ctx.fillText("my name is", 145, 100);
    }

    // Creating text and lines
    this.state.ctx.fillStyle = cobalt;
    this.state.ctx.font = "40px verdana";
    this.state.ctx.fillText("Hi,", 80, 100);
    this.state.ctx.font = "70px verdana";
    this.state.ctx.fillText("Eric Pak", 145, 165);
    this.state.ctx.font = "20px verdana";
    this.state.ctx.fillText("my name is", 145, 100);

    this.state.ctx.font = "24px verdana";
    this.state.ctx.fillText("[Click to paint]", 70, window.innerHeight-80-navFooterHeight);
    this.state.ctx.font = "italic 13px verdana";
    this.state.ctx.fillText("*Disclaimer: resizing the window resets the canvas", 70, window.innerHeight-50-navFooterHeight);
  }

  reset(){
    this.state.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.defaultText();
  }

  click(){
    mouse_down = true;
    var rgb = this.props.style.rgb;
    var srgb = 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+rgb.a+')';
    this.state.ctx.beginPath();
    this.state.ctx.strokeStyle = srgb;
    // this.drawCircle();
  }

  unclick(e){
    mouse_down = false;
    this.state.ctx.closePath();
  }

  // drawCircle(){
  //   this.state.ctx.beginPath();
  //   this.state.ctx.arc(this.state.x, this.state.y, this.props.style.size, 0, Math.PI*2, false);
  //   var rgb = this.props.style.rgb;
  //   var srgb = 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+rgb.a+')';
  //   this.state.ctx.fillStyle = srgb;
  //   this.state.ctx.fill();
  // }

  resizeWindow(){
    this.state.paintCanvas.width = window.innerWidth;
    this.state.paintCanvas.height = window.innerHeight - navFooterHeight;
    this.defaultText();
  }

  saveCanvas(){
    var image = this.state.paintCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image;
  }

  render() {
    return (
      <div style={divStyle} className={this.getClassName()}>
        <canvas
          ref="paintCanvas"
          id={this.getClassName() + "_canvas"}
          onMouseDown={this.click.bind(this)}
          onMouseUp={this.unclick.bind(this)}
          onMouseMove={this._onMouseMove.bind(this)}
          className={this.getClassName() + "_canvas"}
        />
      </div>
    )
  }
}

export default PaintCanvas;
