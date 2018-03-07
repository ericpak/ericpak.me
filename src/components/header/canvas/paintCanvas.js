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
}

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

  moveCanvasUp(){
    divStyle = {
      top: -window.innerHeight + navFooterHeight,
      bottom: window.innerHeight - navFooterHeight,
    }
  }

  moveCanvasDown(){
    divStyle = {
      top: 0,
      bottom: 0,
    }
  }

  // Mousemove event listener
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    // console.log(this.state.x + " " + this.state.y);
    if(mouse_down)
      this.drawCircle();
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
    }

    // Creating text and lines
    this.state.ctx.fillStyle = cobalt;
    this.state.ctx.font = "40px verdana";
    this.state.ctx.fillText("Hi,", 100, 100);
    this.state.ctx.font = "70px verdana";
    this.state.ctx.fillText("Eric Pak", 165, 165);
    this.state.ctx.font = "20px verdana";
    this.state.ctx.fillText("my name is", 165, 100);

    // this.state.ctx.beginPath();
    // this.state.ctx.moveTo(18, 50);
    // this.state.ctx.quadraticCurveTo(20, 100, 80, 200);
    // this.state.ctx.strokeStyle = cobalt;
    // this.state.ctx.stroke();
    // this.state.ctx.font = "12px verdana";
    // this.state.ctx.fillText("Check out the Menu!", 50, 220);


    // this.state.ctx.beginPath();
    // this.state.ctx.moveTo(window.innerWidth-235, 50);
    // this.state.ctx.quadraticCurveTo(window.innerWidth-235, 150, window.innerWidth-350, 200);
    // this.state.ctx.fillText("This Page!", window.innerWidth-460, 208);
    //
    // this.state.ctx.moveTo(window.innerWidth-150, 50);
    // this.state.ctx.quadraticCurveTo(window.innerWidth-200, 200, window.innerWidth-300, 250);
    // this.state.ctx.fillText("Check out my projects!", window.innerWidth-540, 260);
    //
    // this.state.ctx.moveTo(window.innerWidth-60, 50);
    // this.state.ctx.quadraticCurveTo(window.innerWidth-50, 120, window.innerWidth-120, 200);
    // this.state.ctx.fillText("blah blah blah", window.innerWidth-200, 230);
    //
    // this.state.ctx.moveTo(window.innerWidth-90, window.innerHeight-43-navFooterHeight);
    // this.state.ctx.quadraticCurveTo(window.innerWidth-80, window.innerHeight-80-navFooterHeight, window.innerWidth-120, window.innerHeight-100-navFooterHeight);
    // this.state.ctx.fillText("Contact me!", window.innerWidth-248, window.innerHeight-95-navFooterHeight);

    // this.state.ctx.strokeStyle = cobalt;
    // this.state.ctx.stroke();

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
    this.drawCircle();
  }

  unclick(e){
    mouse_down = false;
  }

  drawCircle(){
    this.state.ctx.beginPath();
    this.state.ctx.arc(this.state.x, this.state.y, this.props.style.size, 0, Math.PI*2, false);
    var rgb = this.props.style.rgb
    var srgb = 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+rgb.a+')'
    this.state.ctx.fillStyle = srgb;
    this.state.ctx.fill();
  }

  resizeWindow(){
    this.state.paintCanvas.width = window.innerWidth;
    this.state.paintCanvas.height = window.innerHeight - navFooterHeight;
    this.defaultText();
  }

  saveCanvas(){
    console.log("SAVE")
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
