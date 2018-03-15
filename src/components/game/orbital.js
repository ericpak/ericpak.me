var colorArray = [
  'rgba(255,255,0,1)',
  'rgba(0,255,0,1)',
  'rgba(255,0,0,1)',
  'rgba(0,255,255,1)',
  'rgba(0,0,255,1)',
  'rgba(255,255,255,1)',
];

class Orbital {
  constructor(ctx, level) {
    this.state = {
      ctx: ctx,
      level: level,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      width: level+4,
      height: level+4,
      dx: Math.random()*0.5+0.5,
      dy: Math.random()*0.5+0.5,
      radius: Math.random()*75+25,
      damage: level,
      originalColor: colorArray[level-1],
      color: colorArray[level-1],
      timeout: 0,
    }
  }

  draw() {
    this.state.ctx.fillStyle = this.state.color;
    this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  setTimeout(time){
    this.state.timeout = time + 50;
    this.state.color = this.state.color.substring(0, this.state.color.length-2) + "0.5)";
  }

  upgrade(){
    this.state.damage += 1;
    this.state.width += 1;
    this.state.height += 1;
    this.state.level += 1;
    if(this.state.level < colorArray.length){
      this.state.originalColor = colorArray[this.state.level-1];
      this.state.color = colorArray[this.state.level-1];
    }
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

export default Orbital;
