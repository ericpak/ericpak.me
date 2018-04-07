import Explosion from "./explosion";
import Square from "./square";

var dx = -0.3;
var x;
var y;
var dead = {
  bay: false,
  front: false,
  body: false,
  back: false,
}

class Boss{
  constructor(ctx, canvas, wave, part) {
    this.state = {
      ctx: ctx,
      canvas: canvas,
      wave: wave,
      part: part,
      x: canvas.width,
      y: canvas.height/2,
      dx: -0.3,
      hp: 20*wave,
      damage: 999,
      dead: false,
      color: 'darkgrey',
      explosion: undefined,
      timeout:0,
    }
    x = canvas.width;
    y = canvas.height/2;
    if(part === 'bay'){
      this.state.width = 200;
      this.state.height = 100;
      this.state.x = canvas.width + 100;
      this.state.hp = 20*wave;
    } else if(part === 'front'){
      this.state.width = 151;
      this.state.height = 100;
      this.state.y = canvas.height/2-50;
      this.state.hp = 30*wave;
    } else if(part === 'body'){
      this.state.width = 250;
      this.state.height = 150;
      this.state.x = canvas.width + 150;
      this.state.y = canvas.height/2-100;
      this.state.hp = 40*wave;
    } else if(part === 'back'){
      this.state.width = 25;
      this.state.height = 75;
      this.state.x = canvas.width + 399;
      this.state.y = canvas.height/2-75;
      this.state.hp = 20*wave;
      this.state.explosion = new Explosion(this.state.ctx, this.state.x, this.state.y+15, this.state.width+50, this.state.height-30);
    }
  }

  // Basic Enemy Creator
  createEnemy(xAdjust, height, width, maxVelocity, minVelocity, hp, damage, yVelocity, color){
    let x = Math.random() * (this.state.canvas.width - xAdjust) + this.state.canvas.width;
    let y = Math.random() * (this.state.canvas.height - 44 - height * 2) + height;
    let dx = (Math.random() - 1) * maxVelocity - minVelocity;
    let dy = (Math.random() - 0.5) * yVelocity + 0.5 * yVelocity;
    return new Square(this.state.ctx, x, y, width, height, dx, dy, hp*(Math.ceil(this.state.wave/10)), damage*(Math.ceil(this.state.wave/10)), color);
  }

  // xAdjust, height, width, maxVelocity, minVelociy, hp, damage, yVelocity,color
  basicEnemy(){return this.createEnemy(0, 40, 40, 1, 1, 1, 1, 0, 'blue')};
  tankEnemy(){return this.createEnemy(this.state.canvas.width/2, 60, 60, .7, .5, 5, 1, 0, 'green')};
  fastEnemy(){return this.createEnemy(0, 40, 40, 2, 2, 1, 1, 0, 'purple')};
  smallEnemy(){return this.createEnemy(0, 20, 20, 1, 1, 1, 1, 0, 'yellow')};
  minibossEnemy(){return this.createEnemy(0, 80, 80, .5, .5, 20, 5, 0, 'grey')};
  zagEnemy(){return this.createEnemy(0, 40, 40, 1, 1, 1, 1, 1, 'orange')};
  teleportEnemy(){return this.createEnemy(0, 40, 40, 1, 1, 1, 1, 0, 'white')};
  stealthEnemy(){return this.createEnemy(0, 40, 40, 1, 1, 1, 1, 0, 'black')};

  spawnEnemy(type, amount){
    for(var i = 0; i < amount; i++){
      switch(type){
        case 0: return this.tankEnemy(); break;
        case 1: return this.fastEnemy(); break;
        case 2: return this.smallEnemy(); break;
        case 3: return this.minibossEnemy(); break;
        case 4: return this.zagEnemy(); break;
        case 5: return this.teleportEnemy(); break;
        case 6: return this.stealthEnemy(); break;
        default: return this.basicEnemy(); break;
      }
    }
  }

  // Draw functions
  draw(time) {
    this.state.ctx.fillStyle = this.state.color;
    switch(this.state.part){
      case 'front': this.drawFront(); break;
      case 'body': this.drawBody(); break;
      case 'bay': return this.drawBay(time); break;
      case 'back': this.drawBack(time); break;
      default: break;
    }
    if(dead.front && dead.body && dead.bay && dead.back){
      this.state.explosion.state.x = this.state.x;
      this.state.explosion.update(time);
      if(this.state.timeout === 99999999)
        this.state.timeout = time +300;
    }
  }
  drawBay(time){
    this.state.ctx.fillRect(this.state.x, this.state.y, 200, 100);
    this.state.ctx.fillStyle = 'black';
    this.state.ctx.fillRect(this.state.x+10, this.state.y+10, 180, 80);
    if(dead.front && dead.body && dead.bay && dead.back){
      this.state.explosion.state.x = this.state.x;
      this.state.explosion.update(time);
      if(this.state.timeout === 99999999)
        this.state.timeout = time +300;
    }
    if(!this.state.dead && time%50 === 0){
      return this.spawnEnemy(Math.floor(Math.random()*7), 1);
    }
  }
  drawFront(){
    this.state.ctx.fillRect(this.state.x, this.state.y, 151, 100);
  }
  drawBody(){
    this.state.ctx.fillRect(this.state.x, this.state.y, 250, 150);
  }
  drawBack(time){
    if(!this.state.dead){
      this.state.explosion.update(time);
      this.state.explosion.state.x = this.state.x;
    }
    this.state.ctx.fillStyle = this.state.color;
    this.state.ctx.fillRect(this.state.x, this.state.y, 25, 75);
  }

  death(time){
    this.state.dead = true;
    this.state.explosion = new Explosion(this.state.ctx, this.state.x, this.state.y, this.state.width, this.state.height);
    this.state.timeout = 99999999;

    switch(this.state.part){
      case 'front': dead={...dead, front: true}; break;
      case 'body': dead={...dead, body: true}; break;
      case 'bay': dead={...dead, bay: true}; break;
      case 'back': dead={...dead, back: true}; dx = dx/2; break;
      default: break;
    }
  }

  update(time){
    if(this.state.part == "body")
      x += dx;
    if(this.state.dead)
      this.state.color = 'rgb(77, 77, 77)';
    if(this.state.part === 'bay'){
      this.state.x = x + 100;
    } else if(this.state.part === 'front'){
      this.state.x = x;
      this.state.y = y-50;
    } else if(this.state.part === 'body'){
      this.state.x = x + 150;
      this.state.y = y-100;
    } else if(this.state.part === 'back'){
      this.state.x = x + 399;
      this.state.y = y-75;
    }
    return this.draw(time);
  }
}

export default Boss;
