

var colorArray = [
  'rgba(255,255,255',
  'rgba(255,255,255',
  'rgba(255,255,255',
  'rgba(255,255,255',
  'rgba(107,147,214',
  'rgba(159,193,100',
  'rgba(193,68,14',
  'rgba(255,187,123',
];

class Star {
  constructor(ctx, x, y, spikes) {
    this.state = {
      ctx: ctx,
      x: x,
      y: y,
      cx: x,
      cy: y,
      radius: Math.random()*2,
      outerRadius: Math.random()*3,
      innerRadius: Math.random()*1,
      opacity: Math.random(),
      increment: Math.random()*.03,
      color: Math.floor(Math.random()*colorArray.length),
      rot: Math.PI/2*3,
      spikes: spikes,
      step: Math.PI/spikes,
    }
  }

  draw() {
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[this.state.color]+this.state.opacity+')';
    this.state.ctx.moveTo(this.state.cx, this.state.cy - this.state.outerRadius)
    for (var i = 0; i < this.state.spikes; i++) {
        this.state.x = this.state.cx + Math.cos(this.state.rot) * this.state.outerRadius;
        this.state.y = this.state.cy + Math.sin(this.state.rot) * this.state.outerRadius;
        this.state.ctx.lineTo(this.state.x, this.state.y)
        this.state.rot += this.state.step

        this.state.x = this.state.cx + Math.cos(this.state.rot) * this.state.innerRadius;
        this.state.y = this.state.cy + Math.sin(this.state.rot) * this.state.innerRadius;
        this.state.ctx.lineTo(this.state.x, this.state.y)
        this.state.rot += this.state.step
    }
    this.state.ctx.lineTo(this.state.cx, this.state.cy - this.state.outerRadius)
    this.state.ctx.closePath();
    this.state.ctx.fill();
  }
}

export default Star;
