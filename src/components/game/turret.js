import Bullet from "./bullet";

var colorArray = [
  'rgba(255,255,0,1)',
  'rgba(0,255,0,1)',
  'rgba(255,0,0,1)',
  'rgba(0,255,255,1)',
  'rgba(0,0,255,1)',
  'rgba(255,255,255,1)',
];

var range = 1500;

class Turret {
  constructor(ctx, x, y, level) {
    this.state = {
      ctx: ctx,
      level: level,
      x: x,
      y: y,
      width: 50,
      height: 30,
      hp: 10*level,
      damage: 2*level,
      timeout: 0,
      atkSpd: 20,
      pierce: false,
      bulletArray: [],
      numberOfBullets: 3,
    }
  }

  setTimeout(time){
    this.state.timeout = time + 1000;
  }

  draw() {
    this.state.ctx.fillStyle = 'white';
    this.state.ctx.fillRect(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  update(time){
    if(time%this.state.atkSpd === 0){
      for(var i = 0; i < this.state.numberOfBullets; i++)
        this.state.bulletArray.push(new Bullet(this.state.ctx, this.state.x+this.state.width, this.state.y+((i*this.state.height)/(this.state.numberOfBullets-1)), 4, (-1*(Math.floor(this.state.numberOfBullets/2))/(2*this.state.numberOfBullets))+(i/(2*this.state.numberOfBullets)), this.state.damage, this.state.pierce));
    }
    for(i = this.state.bulletArray.length-1; i >= 0; i--){
      this.state.bulletArray[i].update();
      if(this.state.bulletArray[i].state.x > range)
        this.state.bulletArray.splice(i,1);
    }

    this.draw();
  }
}

export default Turret;
