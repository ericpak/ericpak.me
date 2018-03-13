
var colorArray = [
  'rgba(255,255,255,',
  'rgba(254,255,181,',
  'rgba(255,192,113,',
  'rgba(255,162,85,',
  'rgba(255,91,20,',
  'rgba(255,35,35,',
];

var timein = 50;

class Explosion{
  constructor(ctx, x, y, width, height) {
    this.state = {
      ctx: ctx,
      x: x,
      y: y,
      width: width,
      height: height,
      radius: Math.min(height, width),
      timeout: 0,

      rx1: Math.random()*width+x,
      ry1: Math.random()*height+y,
      rradius1: Math.random()*Math.min(height,width)/4 + Math.min(height,width)/4,
      color1: Math.floor(Math.random()*(colorArray.length)),
      opacity1: Math.random()*0.5,
      rx2: Math.random()*width+x,
      ry2: Math.random()*height+y,
      rradius2: Math.random()*Math.min(height,width)/4 + Math.min(height,width)/4,
      color2: Math.floor(Math.random()*(colorArray.length)),
      opacity2: Math.random()*0.5,
      rx3: Math.random()*width+x,
      ry3: Math.random()*height+y,
      rradius3: Math.random()*Math.min(height,width)/4 + Math.min(height,width)/4,
      color3: Math.floor(Math.random()*(colorArray.length)),
      opacity3: Math.random()*0.5,
      rx4: Math.random()*width+x,
      ry4: Math.random()*height+y,
      rradius4: Math.random()*Math.min(height,width)/4 + Math.min(height,width)/4,
      color4: Math.floor(Math.random()*(colorArray.length)),
      opacity4: Math.random()*0.5,
      rx5: Math.random()*width+x,
      ry5: Math.random()*height+y,
      rradius5: Math.random()*Math.min(height,width)/4 + Math.min(height,width)/4,
      color5: Math.floor(Math.random()*(colorArray.length)),
      opacity5: Math.random()*0.5,
    }
  }

  setTimeout(time){
    this.state.timeout = time+timein;
  }

  randomizeSlower(){
    this.state.rx1 = Math.random()*this.state.width+this.state.x;
    this.state.ry1 = Math.random()*this.state.height+this.state.y;
    this.state.rradius1 = Math.random()*this.state.radius/4 + this.state.radius/4;
    this.state.color1 = Math.floor(Math.random()*(colorArray.length));
    this.state.opacity1 = Math.random()*0.5;

    this.state.rx2 = Math.random()*this.state.width+this.state.x;
    this.state.ry2 = Math.random()*this.state.height+this.state.y;
    this.state.rradius2 = Math.random()*this.state.radius/4 + this.state.radius/4;
    this.state.color2 = Math.floor(Math.random()*(colorArray.length));
    this.state.opacity2 = Math.random()*0.5;

    this.state.rx3 = Math.random()*this.state.width+this.state.x;
    this.state.ry3 = Math.random()*this.state.height+this.state.y;
    this.state.rradius3 = Math.random()*this.state.radius/4 + this.state.radius/4;
    this.state.color3 = Math.floor(Math.random()*(colorArray.length));
    this.state.opacity3 = Math.random()*0.5;
  }
  randomizeFaster(){
    this.state.rx4 = Math.random()*this.state.width+this.state.x;
    this.state.ry4 = Math.random()*this.state.height+this.state.y;
    this.state.rradius4 = Math.random()*this.state.radius/4 + this.state.radius/4;
    this.state.color4 = Math.floor(Math.random()*(colorArray.length));
    this.state.opacity4 = Math.random()*0.5;

    this.state.rx5 = Math.random()*this.state.width+this.state.x;
    this.state.ry5 = Math.random()*this.state.height+this.state.y;
    this.state.rradius5 = Math.random()*this.state.radius/4 + this.state.radius/4;
    this.state.color5 = Math.floor(Math.random()*(colorArray.length));
    this.state.opacity5 = Math.random()*0.5;

    // this.state.rx3 = Math.random()*this.state.width+this.state.x;
    // this.state.ry3 = Math.random()*this.state.width+this.state.y;
    // this.state.rradius3 = Math.random()*this.state.radius/4 + this.state.radius/4;
  }

  draw() {
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[this.state.color1]+this.state.opacity1+')';
    this.state.ctx.arc(this.state.rx1, this.state.ry1, this.state.rradius1,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[this.state.color2]+this.state.opacity2+')';
    this.state.ctx.arc(this.state.rx2, this.state.ry2, this.state.rradius2,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[this.state.color3]+this.state.opacity3+')';
    this.state.ctx.arc(this.state.rx3, this.state.ry3, this.state.rradius3,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[this.state.color4]+this.state.opacity4+')';
    this.state.ctx.arc(this.state.rx4, this.state.ry4, this.state.rradius4,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[this.state.color5]+this.state.opacity5+')';
    this.state.ctx.arc(this.state.rx5, this.state.ry5, this.state.rradius5,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[Math.floor(Math.random()*(colorArray.length))]+Math.random()*0.5+')';
    this.state.ctx.arc(this.state.x+Math.random()*this.state.width, this.state.y+Math.random()*this.state.height, this.state.radius*Math.random()/4,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = colorArray[Math.floor(Math.random()*(colorArray.length))]+Math.random()*0.5+')';
    this.state.ctx.arc(this.state.x+Math.random()*this.state.width, this.state.y+Math.random()*this.state.height, this.state.radius*Math.random()/4,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();
  }

  update(time){
    this.draw();
    this.state.rradius+=.5;
    if(time%10===0){
      this.randomizeSlower();
    }
    if(time%3===0){
      this.randomizeFaster();
    }
  }
}

export default Explosion;
