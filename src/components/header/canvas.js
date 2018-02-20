import React, {Component} from "react";
import classNames from "classnames";
import Circle from "../circle"

class Canvas extends Component {
  getClassName() {
    return classNames("Canvas");
  }

  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
    }
  }

  // Mousemove event listener
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  // If canvas mounts
  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");

    window.addEventListener('resize', function()
    {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // this.initCircles(c);
    });
    this.initCircles(c);
  }

  initCircles(c){
    // Array to hold the circles
    var circleArray = [];

    // Variables for the circles
    var numberOfCircles = 300;
    var maxVelocity = 3;
    var radiusMax = 30;
    var radiusMin = 10;
    var enlargedRadius = 100;
    var colorArray = [
      'pink',
      'lightBlue',
      'yellow',
      'purple'
    ];
    var cursorEventRadius = 100;

    // Creates random circles in an array with the above variables
    for(var i = 0; i < numberOfCircles; i++){
      var radius = (Math.random() * (radiusMax - radiusMin)) + radiusMin;
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * maxVelocity;
      var dy = (Math.random() - 0.5) * maxVelocity;
      var color = colorArray[Math.floor(Math.random()*3)]
      circleArray.push(new Circle(c, radius, enlargedRadius, x, y, dx, dy, color));
    }
    this.animate(c, circleArray, cursorEventRadius);
  }

  // Recursive method
  animate(c, circleArray, cursorEventRadius) {
    window.requestAnimationFrame(() => {
      this.animate(c, circleArray, cursorEventRadius);
    });
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i = 0; i < circleArray.length; i++){
      if(Math.abs(this.state.x - circleArray[i].state.x) < cursorEventRadius && Math.abs(this.state.y - circleArray[i].state.y) < cursorEventRadius){
        circleArray[i].enlargeRadius();
      }
      else{
        circleArray[i].shrinkRadius();
      }
      circleArray[i].update();
    }
  }

  render() {
    return (
      <div className={this.getClassName()} onMouseMove={this._onMouseMove.bind(this)}>
        <canvas ref="canvas" id={this.getClassName() + "_canvas"} className={this.getClassName() + "_canvas"} />
      </div>
    )
  }
}

export default Canvas;
