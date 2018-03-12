// gravity(g)[rate of acceleration] and friction
var g = 1;
var friction = .75;

const footerHeight = 43;

class Circle{
  constructor(c, radius, enlargedRadius, x, y, dx, dy, color, stroke) {
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
      stroke: stroke,
    }
  }

  fall(){
    this.state.dy += g;
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
    if(this.state.stroke){
      this.state.c.strokeStyle = this.state.color;
      this.state.c.stroke();
    }
    else{
      this.state.c.fillStyle = this.state.color;
      this.state.c.fill();
    }
  }

  update(gravity){
    if(this.state.x + this.state.radius > window.innerWidth)
      this.state.dx = (Math.abs(this.state.dx)*-1);
    else if(this.state.x - this.state.radius < 0)
      this.state.dx = Math.abs(this.state.dx);
    if(gravity){
      if(this.state.dy !== 0)
        this.fall();
      if(this.state.y+this.state.radius >= window.innerHeight - footerHeight - 1){
        this.state.dy = -Math.abs(this.state.dy)*friction;
        if(Math.abs(this.state.dy) < 3){
          this.state.dy = 0;
          this.state.y = window.innerHeight - footerHeight - this.state.originalRadius;
        }
        this.state.dx = this.state.dx * friction;
      }
    }else{
      if(this.state.y+this.state.radius > window.innerHeight - footerHeight){
        this.state.dy = -Math.abs(this.state.dy);
      }
      else if(this.state.y-this.state.radius < 0){
        this.state.dy = Math.abs(this.state.dy);
      }
    }
    this.state.y += this.state.dy;
    this.state.x += this.state.dx;

    this.draw();
  }
}

export default Circle;
