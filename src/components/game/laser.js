var colorArray = [
  'rgba(255,255,0,1)',
  'rgba(0,255,0,1)',
  'rgba(255,0,0,1)',
  'rgba(0,255,255,1)',
  'rgba(0,0,255,1)',
  'rgba(255,255,255,1)',
];

var laserDuration = 300;
var gradient1 = 'rgba(0,0,0,0)';
var gradient2 = 'rgba(0,0,0,0)';
var ltime = 0;
var bRadius = 0;
var wRadius = 0;

class Laser {
  constructor(ctx, x, y, level, width) {
    this.state = {
      ctx: ctx,
      level: level,
      x: x,
      y: y,
      damage: 15*level,
      width: width,
      timeout: 0,
      height: 150,
      hitWidth: 0,
      hitHeight: 0,
    }
  }

  setTimeout(time){
    this.state.timeout = time + laserDuration;
  }

  randomNum(x, range){
    return x + (Math.random()-0.5)*range;
  }

  draw(time) {
    ltime = laserDuration - this.state.timeout + time;

    // Yellow Core Glow
    if(ltime < 50){
      gradient1 = this.state.ctx.createRadialGradient(this.state.x, this.state.y, 0, this.state.x, this.state.y, ltime);
      gradient1.addColorStop(0, 'rgba(255,255,0,1)');
      gradient1.addColorStop(1, 'rgba(0,0,0,0)');
    }else{
      var pulse = (time%20)/2;
      gradient1 = this.state.ctx.createRadialGradient(this.state.x, this.state.y, 0, this.state.x, this.state.y, (50 + pulse));
      gradient1.addColorStop(0, 'rgba(255,255,0,1)');
      gradient1.addColorStop(1, 'rgba(0,0,0,0)');
    }
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = gradient1;
    this.state.ctx.arc(this.state.x, this.state.y, 50,0,Math.PI*2)
    this.state.ctx.closePath();
    this.state.ctx.fill();

    // Black Core
    if(ltime > 25 && ltime <= 50){
      bRadius = 20*(ltime-25)/25;
    } else if(ltime > 275 && ltime <= 300){
      bRadius = 300 - ltime;
    }
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = 'black';
    this.state.ctx.arc(this.state.x, this.state.y, bRadius, 0, 2 * Math.PI);
    this.state.ctx.fill();

    // Black Arms
    if(ltime >= 90 && ltime <= 250){
      this.state.ctx.save();
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(this.state.x,this.state.y-20);
      this.state.ctx.quadraticCurveTo(this.state.x+20,this.state.y-80,this.state.x+80,this.state.y);
      this.state.ctx.lineWidth = 5;
      this.state.ctx.shadowBlur = 5;
      this.state.ctx.strokeStyle = 'black';
      this.state.ctx.shadowColor = 'white';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.moveTo(this.state.x,this.state.y-10);
      this.state.ctx.quadraticCurveTo(this.state.x+20,this.state.y-40,this.state.x+80,this.state.y);
      this.state.ctx.stroke();


      this.state.ctx.beginPath();
      this.state.ctx.moveTo(this.state.x,this.state.y+10);
      this.state.ctx.quadraticCurveTo(this.state.x+20,this.state.y+40,this.state.x+80,this.state.y);
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.moveTo(this.state.x,this.state.y+20);
      this.state.ctx.quadraticCurveTo(this.state.x+20,this.state.y+80,this.state.x+80,this.state.y);
      this.state.ctx.stroke();
      this.state.ctx.closePath();
      this.state.ctx.restore();
    }

    // Lightning Arms
    if(ltime > 65 && ltime <= 275){
      // Top Arm
      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y-20, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y-41, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y-47, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y-46, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y-35, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y-12, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y-20, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y-41, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y-47, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y-46, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y-35, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y-12, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y-20, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y-41, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y-47, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y-46, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y-35, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y-12, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      // Top Mid Arm
      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y-10, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y-21, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y-23, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y-22, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y-17, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y-6, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y-10, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y-21, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y-23, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y-22, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y-17, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y-6, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      // Top Mid Arm
      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y+10, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y+21, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y+23, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y+22, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y+17, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y+6, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y+10, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y+21, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y+23, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y+22, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y+17, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y+6, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      // Bottom Arm
      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y+20, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y+41, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y+47, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y+46, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y+35, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y+12, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y+20, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y+41, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y+47, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y+46, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y+35, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y+12, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();

      this.state.ctx.beginPath();
      this.state.ctx.lineWidth = 1;
      this.state.ctx.moveTo(this.randomNum(this.state.x, 15), this.randomNum(this.state.y+20, 15));
      this.state.ctx.lineTo(this.randomNum(this.state.x+10, 15), this.randomNum(this.state.y+41, 15));
      if(ltime > 67 && ltime <= 270)
        this.state.ctx.lineTo(this.randomNum(this.state.x+20, 15), this.randomNum(this.state.y+47, 15));
      if(ltime > 70 && ltime <= 267)
        this.state.ctx.lineTo(this.randomNum(this.state.x+30, 15), this.randomNum(this.state.y+46, 15));
      if(ltime > 75 && ltime <= 262)
        this.state.ctx.lineTo(this.randomNum(this.state.x+50, 15), this.randomNum(this.state.y+35, 15));
      if(ltime > 81 && ltime <= 256)
        this.state.ctx.lineTo(this.randomNum(this.state.x+70, 15), this.randomNum(this.state.y+12, 15));
      if(ltime > 87 && ltime <= 250)
        this.state.ctx.lineTo(this.randomNum(this.state.x+80, 15), this.randomNum(this.state.y, 15));
      this.state.ctx.strokeStyle = 'rgba(255,255,255,'+Math.random()+')';
      this.state.ctx.stroke();
    }

    // White glow
    if(ltime > 90 && ltime <= 165){
      wRadius = (ltime - 90)/2;
    } else if(ltime > 240 && ltime <= 265){
      wRadius = 265 - ltime;
    }
    gradient2 = this.state.ctx.createRadialGradient(this.state.x+80, this.state.y, wRadius/3, this.state.x+80, this.state.y, wRadius);
    gradient2.addColorStop(0, 'rgba(255,255,255,1)');
    gradient2.addColorStop(1, 'rgba(0,0,0,0)');
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle = gradient2;
    this.state.ctx.arc(this.state.x+80, this.state.y, wRadius, 0, 2 * Math.PI);
    this.state.ctx.fill();

    // Laser Beam
    if(ltime > 100 && ltime <= 220){
      let lbeamPercent = (ltime-100)/120;
      this.state.hitWidth = this.state.width * lbeamPercent *2;
      this.state.hitHeight = this.state.height*lbeamPercent;
      this.state.ctx.fillStyle = 'white';
      this.state.ctx.fillRect(this.state.x+80, this.state.y-this.state.hitHeight/2, this.state.hitWidth, this.state.hitHeight);
    }
    else if(ltime > 220 && ltime <= 255){
      let lbeamPercent = 1-((ltime-220)/35);
      this.state.hitWidth = this.state.width * lbeamPercent *2;
      this.state.hitHeight = this.state.height*lbeamPercent;
      this.state.ctx.fillStyle = 'white';
      this.state.ctx.fillRect(this.state.x+80, this.state.y-this.state.hitHeight/2, this.state.hitWidth, this.state.hitHeight);
    }
  }

  update(time){
    this.draw(time);
  }
}

export default Laser;
