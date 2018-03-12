class Txt {
  constructor(ctx, text, x, y, size, color, time) {
    this.state = {
      ctx: ctx,
      text: text,
      x: x + (Math.random()-0.5)*30,
      y: y + (Math.random()-0.5)*30,
      size: size,
      color: color,
      time: time,
    }
  }

  draw() {
    this.state.ctx.fillStyle = this.state.color;
    this.state.ctx.font = this.state.size+"px verdana";
    this.state.ctx.fillText(this.state.text, this.state.x, this.state.y);
  }

  update(){
    this.state.y -= 1;
    this.draw();
  }
}

export default Txt;
