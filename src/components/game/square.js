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
      cx: x,
      cy: y,
      teleTime: Math.floor(Math.random()*150+150),
    }
  }

  draw() {
    this.state.ctx.fillStyle = this.state.color;
    if(this.state.color === 'black'){
      this.state.ctx.strokeStyle = 'black';
      this.state.ctx.strokeRect(this.state.x, this.state.y, this.state.width, this.state.height);
    }else{
      this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
    }
  }

  death(time){
    this.state.dead = true;
    this.state.explosion = new Explosion(this.state.ctx, this.state.x, this.state.y, this.state.width, this.state.height);
    this.state.timeout = time+100;
    this.state.dy = 0;
    this.state.dx = 0;
  }

  update(time){
    this.draw();
    if(this.state.dead)
      this.state.explosion.update(time);
    else{
      if(this.state.color === 'white'){
        this.state.cx += this.state.dx;
          if(time !== undefined){
            this.state.cy += Math.sin(this.state.dy*time/15)*2.5;
              if(this.state.cy <= 0 || this.state.cy >= 860)
                this.state.dy = -this.state.dy;
          }
          if(time%this.state.teleTime === 0){
            this.state.x = this.state.cx;
            this.state.y = this.state.cy;
          }
      }
      else{
      this.state.x += this.state.dx;
        if(time !== undefined){
          this.state.y += Math.sin(this.state.dy*time/15)*2.5;
            if(this.state.y <= 0 || this.state.y >= 860)
              this.state.dy = -this.state.dy;
        }
      }
    }
  }
}

export default Square;
