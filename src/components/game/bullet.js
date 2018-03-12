class Bullet {
  constructor(ctx, x, y, dx, dy, pierce) {
    this.state = {
      ctx: ctx,
      x: x,
      y: y,
      width: 4,
      height: 4,
      dx: dx,
      dy: dy,
    }
  }

  draw() {
    this.state.ctx.fillStyle = 'white';
    this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  update(){
    this.state.x += this.state.dx;
    this.state.y += this.state.dy;
    this.draw();
  }
}

export default Bullet;
