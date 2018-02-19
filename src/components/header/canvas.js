import React, {Component} from "react";
import classNames from "classnames";
import Circle from "../circle"

class Canvas extends Component {

  getClassName() {
    return classNames("Canvas");
  }

  // If canvas mounts
  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");

    // Array to hold the circles
    var circleArray = [];

    // Variables for the circles
    var numberOfCircles = 100;
    var maxVelocity = 3;
    var radiusMax = 30;
    var radiusMin = 10;
    var colorArray = [
      'pink',
      'lightBlue',
      'yellow',
      'purple'
    ]

    // Creates random circles in an array with the above variables
    for(var i = 0; i < numberOfCircles; i++){
      var radius = (Math.random() * radiusMax - radiusMin) + radiusMin;
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * maxVelocity;
      var dy = (Math.random() - 0.5) * maxVelocity;
      var color = colorArray[Math.floor(Math.random()*3)]
      circleArray.push(new Circle(c, radius, x, y, dx, dy, color));
    }
    this.animate(c, circleArray);
  }

  // Recursive method
  animate(c, circleArray) {
    window.requestAnimationFrame(() => {
      this.animate(c, circleArray);
    });
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i = 0; i < circleArray.length; i++){
      circleArray[i].update();
    }
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <canvas ref="canvas" id={this.getClassName() + "_canvas"} className={this.getClassName() + "_canvas"} />
      </div>
    )
  }
}

export default Canvas;
