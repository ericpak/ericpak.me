import Explosion from "./explosion";

class Square{
  constructor(ctx, x, y, width, height, dx, dy, hp, damage, color) {
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
      dead: false,
      explosion: undefined,
      timeout:0,
    }
  }

  draw() {
    this.state.ctx.fillStyle = this.state.color;
    this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  death(time){
    this.state.dead = true;
    this.state.explosion = new Explosion(this.state.ctx, this.state.x, this.state.y, this.state.width, this.state.height);
    this.state.timeout = time+100;
  }

  update(time){
    this.draw();
    if(this.state.dead)
      this.state.explosion.update(time);
    else
      this.state.x += this.state.dx;
  }
}

export default Square;
