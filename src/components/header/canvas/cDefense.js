import React, {Component} from "react";
import classNames from "classnames";
import Square from "./square";
import Txt from "./txt";

const navFooterHeight = 44;

// cDefense default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'hidden',
  opacity: 0,
}

// Default game values
var time = 0;
var hpDisplay = "[III]";
var kills = 0;
var firstTime = true;
var wave = 1;
var waveStartTime = 0;
var waveStarted = false;
var waitForPerk = false;
var wavesTilPerk = 1;

// Wave Banner DisplayTime
var waveBannerDisplayTime = 300;

// Perk variables
var hp = 3;
var maxHp = 3;
var aoeSize = 0;
var hasPierce = false;
var damage = 1;
var orbital = 0;
var regen = 0;

// aoe variables
var aoeX = 0;
var aoeY = 0;
var aoeTime = 0;

class CDefense extends Component {
  getClassName() {
    return classNames("CDefense");
  }

  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      canvas: this.refs.canvas,
      ctx: undefined,
      startSquare: undefined,
      enemyArray: [],
      perkArray: [],
      textArray: [],
      availablePerks: ['aoe', 'pierce', 'maxhp', 'dmg +1', 'orbital', 'regen'],
      gameover: false,
    }
  }

  // If canvas mounts
  componentDidMount() {
    this.state.canvas = this.refs.canvas;
    // Default Values
    firstTime = true;
    waitForPerk = false;
    this.state.enemyArray = [];
    this.state.textArray = [];
    this.state.perkArray = [];
    waveStarted = false;
    time = 0;
    kills = 0;
    wave = 1;
    // Default Perks
    hp = 3;
    maxHp = 3;
    aoeSize = 0;
    hasPierce = false;
    damage = 1;
    orbital = 0;
    regen = 0;
    // Default States
    this.adjustHpDisplay();
    this.setState({ gameover: false });

    this.state.canvas.width = 1400;//window.innerWidth;
    this.state.canvas.height = 900;// window.innerHeight - navFooterHeight;
    this.state.ctx = this.state.canvas.getContext("2d");
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.state.ctx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);

    // Start screen
    this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.state.ctx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.state.ctx.font = "40px verdana";
    this.state.ctx.fillText("Alpha version", ((this.state.canvas.width/2) - 140), this.state.canvas.height/2 - 140);
    this.state.ctx.fillText("Click the squares to kill them", ((this.state.canvas.width/2) - 290), this.state.canvas.height/2);
    this.state.ctx.fillText("Protect the left side", ((this.state.canvas.width/2) - 205), this.state.canvas.height/2 + 40);
    this.state.startSquare = new Square(this.state.ctx, ((this.state.canvas.width/2) - 75), ((this.state.canvas.height/2) + 50), 150, 50, 0, 0, 1, 1, 'white');
    this.state.startSquare.update();
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.state.ctx.fillText("Start", ((this.state.canvas.width/2) - 55), ((this.state.canvas.height/2) + 90));
  }

  // Mousemove event
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  // Mouse click event
  _onMouseClick(e) {
    if(waitForPerk){
      for(var i = 0; i < this.state.perkArray.length; i+=2){
        if(e.nativeEvent.offsetX >= this.state.perkArray[i].state.x && e.nativeEvent.offsetX <= this.state.perkArray[i].state.x + this.state.perkArray[i].state.width){
          if(e.nativeEvent.offsetY >= this.state.perkArray[i].state.y && e.nativeEvent.offsetY <= this.state.perkArray[i].state.y + this.state.perkArray[i].state.height){
            this.activatePerk(this.state.perkArray[i+1]);
            this.state.perkArray = [];
            waitForPerk = false;
            this.animate();
          }
        }
      }
    } else {
      this.aoeExplosion(e.nativeEvent.offsetX, e.nativeEvent.offsetY, time);
      for(var i = this.state.enemyArray.length - 1; i >= 0; i--){
        if(e.nativeEvent.offsetX + aoeSize >= this.state.enemyArray[i].state.x && e.nativeEvent.offsetX - aoeSize <= this.state.enemyArray[i].state.x + this.state.enemyArray[i].state.width){
          if(e.nativeEvent.offsetY + aoeSize >= this.state.enemyArray[i].state.y && e.nativeEvent.offsetY - aoeSize <= this.state.enemyArray[i].state.y + this.state.enemyArray[i].state.height){
            this.state.enemyArray[i].state.hp -= damage;
            this.state.textArray.push(new Txt(this.state.ctx, damage, this.state.enemyArray[i].state.x + Math.random()*10, this.state.enemyArray[i].state.y + Math.random()*10, damage+11, 'red', time+100));
            if(this.state.enemyArray[i].state.hp <= 0){
              this.state.enemyArray.splice(i,1);
              kills++;
            }
            if(!hasPierce){
              break;
            }
          }
        }
      }
      if(this.state.gameover || firstTime){
        if(e.nativeEvent.offsetX >= this.state.startSquare.state.x && e.nativeEvent.offsetX <= this.state.startSquare.state.x + this.state.startSquare.state.width){
          if(e.nativeEvent.offsetY >= this.state.startSquare.state.y && e.nativeEvent.offsetY <= this.state.startSquare.state.y + this.state.startSquare.state.height){
            this.reset();
            firstTime = false;
            this.state.startSquare = undefined;
          }
        }
      }
    }
  }

  reset(){
    this.state.enemyArray = [];
    this.state.textArray = [];
    this.state.perkArray = [];
    waveStarted = false;
    waitForPerk = false;
    time = 0;
    kills = 0;
    wave = 1;

    // reset perks
    hp = 3;
    maxHp = 3;
    aoeSize = 0;
    hasPierce = false;
    damage = 1;
    orbital = 0;
    regen = 0;

    this.adjustHpDisplay();
    this.setState({ gameover: false });
    if(this.state.gameover || firstTime || waitForPerk)
      waitForPerk = false;
      this.animate();
  }

  ///////////////////////////////////////////////////////////////////////
  // Waves
  ///////////////////////////////////////////////////////////////////////

  // Display Wave Banner
  waveBanner(time){
    let wtime = time;
    if(time >= (waveBannerDisplayTime/3)*2)
      wtime = 0;
    else if(time >= (waveBannerDisplayTime/2) && time < (waveBannerDisplayTime/3)*2)
      wtime = 2*(((waveBannerDisplayTime/3)*2) - time);
    else if(time >= waveBannerDisplayTime/6 && time < waveBannerDisplayTime/2)
      wtime = 100;
    else if(time < waveBannerDisplayTime/6)
      wtime = time * 2;
    this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.state.ctx.fillRect(0, ((this.state.canvas.height/2) - wtime), this.state.canvas.width, (2 * wtime));
    this.state.ctx.fillStyle = "rgba(0, 0, 0,"+ (0.7 * wtime) + ")";
    this.state.ctx.font = "80px verdana";
    if(wave%10 === 0)
      this.state.ctx.fillText("Boss Wave", ((this.state.canvas.width/2) - 50), this.state.canvas.height/2);
    else
      this.state.ctx.fillText("Wave " + wave, ((this.state.canvas.width/2)), this.state.canvas.height/2);
  }

  // New Wave mechanics
  newWave(){
    // Check for perk
    if((wave)%wavesTilPerk === 0){
      this.newPerk();
    }
    // Wave 1 or 5+
    if((wave)%10 === 1 || (wave)%10 >= 5){
      let numberOfEnimies = 10;
      for(var i = 0; i < (wave * numberOfEnimies); i++)
        this.basicEnemy();
    }
    // Wave 2
    if((wave)%10 === 2 || (wave)%10 >= 6){
      let numberOfEnimies = 10;
      for(i = 0; i < (wave * numberOfEnimies); i++)
        this.tankEnemy();
    }
    // Wave 3
    if((wave)%10 === 3 || (wave)%10 >= 7){
      let numberOfEnimies = 10;
      for(i = 0; i < (wave * numberOfEnimies); i++)
        this.fastEnemy();
    }
    // Wave 4
    if((wave)%10 === 4 || (wave)%10 >= 8){
      let numberOfEnimies = 10;
      for(i = 0; i < (wave * numberOfEnimies); i++)
        this.smallEnemy();
    }
    // Boss Wave
    if((wave)%10 === 0 || (wave)%10 === 5){
      let numberOfEnimies = 10;
      for(i = 0; i < (wave * numberOfEnimies); i++)
        this.bossEnemy();
    }
    wave++;
  }

  adjustHpDisplay(){
    hpDisplay = "[";
    for(var i = 0; i < hp; i++)
      hpDisplay += "I";
    for(var i = 0; i < (maxHp - hp); i++)
      hpDisplay += " ";
    hpDisplay += "]";
  }

  ///////////////////////////////////////////////////////////////////////
  // Enemies
  ///////////////////////////////////////////////////////////////////////

  // Basic Enemy Creator
  createEnemy(xAdjust, height, width, maxVelocity, minVelocity, hp, damage, color){
    let x = Math.random() * (this.state.canvas.width - xAdjust) + this.state.canvas.width;
    let y = Math.random() * (this.state.canvas.height - navFooterHeight - height * 2) + height;
    let dx = (Math.random() - 1) * maxVelocity - minVelocity;
    let dy = (Math.random() - 0.5) * maxVelocity;
    this.state.enemyArray.push(new Square(this.state.ctx, x, y, width, height, dx, dy, hp, damage, color));
  }

  basicEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 'blue')}
  tankEnemy(){this.createEnemy(this.state.canvas.width/3, 60, 60, 1, .5, 2, 1, 'green')}
  fastEnemy(){this.createEnemy(0, 40, 40, 2, 2, 1, 1, 'purple')}
  smallEnemy(){this.createEnemy(0, 20, 20, 1, 1, 1, 1, 'yellow')}
  bossEnemy(){this.createEnemy(0, 80, 80, .5, .5, 20, 5, 'white')}



  ///////////////////////////////////////////////////////////////////////
  // Perks
  ///////////////////////////////////////////////////////////////////////

  // New Perk Screen
  newPerk(){
    waitForPerk = true;

    // New perk screen
    this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.state.ctx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.state.ctx.font = "40px verdana";
    this.state.ctx.fillText("Choose a Perk", ((this.state.canvas.width/2) - 140), this.state.canvas.height/2 - 140);

    // Randomize which perks are available
    let width = 120;
    let height = width;
    let perk1 = this.state.availablePerks[Math.floor(Math.random() * this.state.availablePerks.length)];
    let perk2 = this.state.availablePerks[Math.floor(Math.random() * this.state.availablePerks.length)];
    while(perk2 === perk1){perk2 = this.state.availablePerks[Math.floor(Math.random() * this.state.availablePerks.length)]}
    let perk3 = this.state.availablePerks[Math.floor(Math.random() * this.state.availablePerks.length)];
    while(perk3 === perk1 || perk3 === perk2){perk3 = this.state.availablePerks[Math.floor(Math.random() * this.state.availablePerks.length)]}

    // Display chosen random perks
    this.state.perkArray.push(new Square(this.state.ctx, ((this.state.canvas.width/4)-(width/2)), this.state.canvas.height/2, width, width, 0, 0, 1, 0, 'yellow'), perk1);
    this.state.perkArray.push(new Square(this.state.ctx, ((this.state.canvas.width/4)*2-(width/2)), this.state.canvas.height/2, width, width, 0, 0, 1, 0, 'green'), perk2);
    this.state.perkArray.push(new Square(this.state.ctx, ((this.state.canvas.width/4)*3-(width/2)), this.state.canvas.height/2, width, width, 0, 0, 1, 0, 'blue'), perk3);
    this.state.perkArray[0].update();
    this.state.ctx.fillStyle = "black";
    this.state.ctx.fillText(perk1, (this.state.canvas.width/4)-(width/2), (this.state.canvas.height/2 + height));
    this.state.perkArray[2].update();
    this.state.ctx.fillStyle = "black";
    this.state.ctx.fillText(perk2, (this.state.canvas.width/4)*2-(width/2), (this.state.canvas.height/2 + height));
    this.state.perkArray[4].update();
    this.state.ctx.fillStyle = "black";
    this.state.ctx.fillText(perk3, (this.state.canvas.width/4)*3-(width/2), (this.state.canvas.height/2 + height));
  }

  // Perk Switch Statement
  activatePerk(perk){
    switch(perk){
      case 'aoe':
          this.aoePerk();
          break;
      case 'pierce':
          this.piercePerk();
          break;
      case 'maxhp':
          this.maxhpPerk();
          break;
      case 'dmg +1':
          this.dmgPerk();
          break;
      case 'orbital':
          this.orbitalPerk();
          break;
      case 'regen':
          this.regenPerk();
          break;
    }
  }

  // Perk Methods
  aoePerk(){
    aoeSize += 20;
    if(aoeSize > 120)
      this.state.availablePerks.splice(this.state.availablePerks.indexOf('aoe'), 1);
  }
  piercePerk(){
    hasPierce = true;
    this.state.availablePerks.splice(this.state.availablePerks.indexOf('pierce'), 1);
  }
  maxhpPerk(){
    hp += maxHp;
    maxHp += maxHp;
    this.adjustHpDisplay();
  }
  dmgPerk(){
    damage++;
  }
  orbitalPerk(){
    orbital++;
  }
  regenPerk(){
    regen++;
  }


  aoeExplosion(x, y, time){
    aoeX = x;
    aoeY = y;
    aoeTime = time + 5;
  }

  makeVisible(){
    divStyle = {
      ...divStyle,
      visibility: 'visible',
      opacity: 1,
    }
    this.forceUpdate();
  }
  makeHidden(){
    divStyle = {
      ...divStyle,
      visibility: 'hidden',
      opacity: 0,
    }
  }

  // Recursive method
  animate() {
    window.requestAnimationFrame(() => {
      if(!this.state.gameover && !waitForPerk){
        this.animate();
      }
    });
    this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.state.ctx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    for(var i = 0; i < this.state.enemyArray.length; i++){
      this.state.enemyArray[i].update();
      if(this.state.enemyArray[i].state.x <= 0){
        hp-= this.state.enemyArray[i].state.damage;
        this.state.enemyArray.splice(i,1);
        this.adjustHpDisplay();
        if(hp <= 0)
          this.state.gameover = true;
      }
    }

    // Regen
    if(time%1000 === 0 && regen > 0){
      if(hp < maxHp){
        hp += regen;
        this.state.textArray.push(new Txt(this.state.ctx,'+'+regen, 14+(11*hp)+Math.random()*20, 100 + Math.random()*20, (regen*2)+16, 'green', time+100));
        if(hp > maxHp)
          hp = maxHp;
        this.adjustHpDisplay();
      }
    }

    // Starting a new wave
    if(this.state.enemyArray.length === 0 && !waveStarted){
      waveStartTime = time + waveBannerDisplayTime;
      waveStarted = true;
    }
    if(waveStartTime > time){this.waveBanner(waveStartTime - time)}
    if(waveStartTime === time){
      this.newWave();
      waveStarted = false;
    }

    // Aoe Explosion
    if(aoeTime > time){
      this.state.ctx.fillStyle = "rgba(255, 99, 71, 0.5)";
      this.state.ctx.fillRect(aoeX - aoeSize, aoeY - aoeSize, 2 * aoeSize, 2 * aoeSize);
    }

    // Create Text/Dmg number
    if(this.state.textArray.length > 0){
      for(var i = this.state.textArray.length - 1; i >= 0; i--){
        this.state.textArray[i].update();
        if(this.state.textArray[i].state.time < time)
          this.state.textArray.splice(i,1);
      }
    }

    // Score
    this.state.ctx.fillStyle = "white";
    this.state.ctx.font = "20px verdana";
    this.state.ctx.fillText("Time: " + time, 10, 80);
    time++;

    // Kills
    this.state.ctx.fillText("Kills: " + kills, 180, 80);

    // Hp Display
    this.state.ctx.fillStyle = "lightgreen";
    this.state.ctx.font = "20px courier";
    this.state.ctx.fillText(hpDisplay, 10, 100);

    // gameover screen
    if(this.state.gameover){
      this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.state.ctx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
      this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      this.state.ctx.font = "100px verdana";
      this.state.ctx.fillText("Game Over", ((this.state.canvas.width/2) - 285), this.state.canvas.height/2);
      this.state.ctx.font = "40px verdana";
      this.state.startSquare = new Square(this.state.ctx, ((this.state.canvas.width/2) - 80), ((this.state.canvas.height/2) + 25), 160, 50, 0, 0, 1, 1, 'white');
      this.state.startSquare.update();
      this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      this.state.ctx.fillText("Restart", ((this.state.canvas.width/2) - 80), ((this.state.canvas.height/2) + 65));
    }
  }

  render() {
    return (
      <div
        style={divStyle}
        className={this.getClassName()}
        onMouseMove={this._onMouseMove.bind(this)}
        onMouseDown={this._onMouseClick.bind(this)}
      >
        <canvas ref="canvas" id={this.getClassName() + "_canvas"} className={this.getClassName() + "_canvas"} />
      </div>
    )
  }
}

export default CDefense;
