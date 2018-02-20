import React, {Component} from "react";
import classNames from "classnames";
import Canvas from './header/canvas';

class Circle extends Component {
  getClassName() {
    return classNames("Circle");
  }

  constructor(c,radius, enlargedRadius, x, y, dx, dy, color) {
    super();
    this.state = {
      c: c,
      radius: radius,
      originalRadius: radius,
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      color: color,
      enlargedRadius: enlargedRadius,
    }
  }

  enlargeRadius(){
    if(this.state.radius < this.state.enlargedRadius)
      this.state.radius += 1;
  }
  shrinkRadius(){
    if(this.state.radius >= this.state.originalRadius)
      this.state.radius -= 1;
  }

  draw() {
    this.state.c.beginPath();
    this.state.c.arc(this.state.x, this.state.y, this.state.radius, 0, Math.PI *2, false);
    this.state.c.strokeStyle = this.state.color;
    this.state.c.stroke();
  }

  update(){
    if(this.state.x + this.state.radius > window.innerWidth || this.state.x - this.state.radius < 0) {
      this.state.dx = -this.state.dx;
    }
    if(this.state.y + this.state.radius > window.innerHeight || this.state.y - this.state.radius < 0) {
      this.state.dy = -this.state.dy;
    }
    this.state.x += this.state.dx;
    this.state.y += this.state.dy;

    this.draw();
  }
}

export default Circle;
