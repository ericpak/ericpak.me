import {Component} from "react";
import classNames from "classnames";

class Square extends Component {
  getClassName() {
    return classNames("Square");
  }

  constructor(ctx, width, height, dx, dy, radius, hp, damage, color) {
    super();
    this.state = {
      ctx: ctx,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      width: width,
      height: height,
      dx: dx,
      dy: dy,
      radius: radius,
      hp: hp,
      damage: damage,
      color: color,
    }
  }

  draw() {
    this.state.ctx.fillStyle = this.state.color;
    this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  update(mouseX, mouseY, radians){
    // Drag effect
    this.state.lastX += (mouseX - this.state.lastX) * 0.05;
    this.state.lastY += (mouseY - this.state.lastY) * 0.05;

    // Circular motion
    this.state.x = this.state.lastX + Math.sin(this.state.dx*radians) * this.state.radius;
    this.state.y = this.state.lastY + Math.cos(this.state.dx*radians) * this.state.radius;
    this.draw();
  }
}

export default Square;
