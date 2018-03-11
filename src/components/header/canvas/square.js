import {Component} from "react";
import classNames from "classnames";

class Square extends Component {
  getClassName() {
    return classNames("Square");
  }

  constructor(ctx, x, y, width, height, dx, dy, hp, damage, color) {
    super();
    this.state = {
      ctx: ctx,
      x: x,
      y: y,
      width: width,
      height: height,
      dx: dx,
      dy: dy,
      hp: hp,
      damage: damage,
      color: color,
    }
  }

  draw() {
    this.state.ctx.fillStyle = this.state.color;
    this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  update(){
    this.state.x += this.state.dx;
    this.draw();
  }
}

export default Square;
