import React, {Component} from "react";
import classNames from "classnames";
import Square from "./square";
import Txt from "./txt";
import Orbital from "./orbital";

const navFooterHeight = 44;

// cDefense default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'hidden',
  opacity: 0,
}

// Game variables
var x = 0;
var y = 0;
var time = 0;
var hpDisplay = "[III]";
var kills = 0;
var firstTime = true;
var wave = 1;
var waveStartTime = 0;
var waveStarted = false;
var waitForPerk = false;
var wavesTilPerk = 1;
var canvas = undefined;
var ctx = undefined;
var startSquare = undefined;
var enemyArray = [];
var perkArray = [];
var textArray = [];
var orbitArray = [];
var availablePerks = ['aoe', 'pierce', 'maxhp', 'dmg +1', 'orbital', 'regen'];
var gameover = false;

// Wave Banner DisplayTime
var waveBannerDisplayTime = 300;

// Perk variables
var hp = 3;
var maxHp = 3;
var aoeSize = 0;
var hasPierce = false;
var damage = 1;
var regen = 0;
var orbitalLevel = 1;
var regenTime = 1425;

// aoe variables
var aoeX = 0;
var aoeY = 0;
var aoeTime = 0;

class CDefense extends Component {
  getClassName() {
    return classNames("CDefense");
  }

  componentDidMount() {
    canvas = this.refs.canvas;
    firstTime = true;
    this.setDefaults();
    this.adjustHpDisplay();
    window.addEventListener('keydown',this._onKeyDown,false);
    // Game Size
    canvas.width = 1400;
    canvas.height = 900;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Start screen
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    startSquare = new Square(ctx, ((canvas.width/2) - 75), ((canvas.height/2) + 50), 150, 50, 0, 0, 1, 1, 'rgba(255, 255, 255, 0.5)');
    startSquare.update();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.font = "40px verdana";
    ctx.fillText("Alpha version", ((canvas.width/2) - 140), canvas.height/2 - 140);
    ctx.fillText("Click the squares to kill them", ((canvas.width/2) - 290), canvas.height/2);
    ctx.fillText("Protect the left side", ((canvas.width/2) - 205), canvas.height/2 + 40);
    ctx.fillText("Start", ((canvas.width/2) - 55), ((canvas.height/2) + 90));
  }

  reset(){
    this.setDefaults();
    this.adjustHpDisplay();
    if(gameover || firstTime || waitForPerk){
      gameover = false;
      waitForPerk = false;
      this.animate();
    }
  }

  setDefaults(){
    // Default Game Variables
    enemyArray = [];
    textArray = [];
    perkArray = [];
    orbitArray = [];
    waveStarted = false;
    waitForPerk = false;
    time = 0;
    kills = 0;
    wave = 1;
    // Default Perks
    hp = 3;
    maxHp = 3;
    aoeSize = 0;
    hasPierce = false;
    damage = 1;
    regen = 0;
    orbitalLevel = 1;
    regenTime = 1425;
  }

  ///////////////////////////////////////////////////////////////////////
  // Event Handler
  ///////////////////////////////////////////////////////////////////////

  // Mousemove
  _onMouseMove(e) {
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
  }
  // Mouse click
  _onMouseClick(e) {
    if(waitForPerk){
      for(var i = 0; i < perkArray.length; i+=2){
        if(e.nativeEvent.offsetX >= perkArray[i].state.x && e.nativeEvent.offsetX <= perkArray[i].state.x + perkArray[i].state.width){
          if(e.nativeEvent.offsetY >= perkArray[i].state.y && e.nativeEvent.offsetY <= perkArray[i].state.y + perkArray[i].state.height){
            this.activatePerk(perkArray[i+1]);
            perkArray = [];
            waitForPerk = false;
            this.animate();
          }
        }
      }
    } else {
      this.aoeExplosion(e.nativeEvent.offsetX, e.nativeEvent.offsetY, time);
      this.damageEnemy(e.nativeEvent.offsetX, e.nativeEvent.offsetY, aoeSize, aoeSize, damage, hasPierce);
      if(gameover || firstTime){
        if(e.nativeEvent.offsetX >= startSquare.state.x && e.nativeEvent.offsetX <= startSquare.state.x + startSquare.state.width){
          if(e.nativeEvent.offsetY >= startSquare.state.y && e.nativeEvent.offsetY <= startSquare.state.y + startSquare.state.height){
            this.reset();
            firstTime = false;
            startSquare = undefined;
          }
        }
      }
    }
  }
  _onKeyDown(e){
    if(e.key === ' '){
      console.log('space')
    }
  }

  damageEnemy(x, y, width, height, dmg, pierce){
    var hit = false;
    for(var i = enemyArray.length - 1; i >= 0; i--){
      if(x + width >= enemyArray[i].state.x && x - width <= enemyArray[i].state.x + enemyArray[i].state.width){
        if(y + height >= enemyArray[i].state.y && y - height <= enemyArray[i].state.y + enemyArray[i].state.height){
          enemyArray[i].state.hp -= dmg;
          hit = true;
          textArray.push(new Txt(ctx, dmg, x, y, damage+11, 'red', time+100));
          if(enemyArray[i].state.hp <= 0){
            enemyArray.splice(i,1);
            kills++;
          }
          if(!pierce){
            break;
          }
        }
      }
    }
    return hit;
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, ((canvas.height/2) - wtime), canvas.width, (2 * wtime));
    ctx.fillStyle = "rgba(0, 0, 0,"+ (0.7 * wtime) + ")";
    ctx.font = "80px verdana";
    if(wave%10 === 0)
      ctx.fillText("Boss Wave", ((canvas.width/2) - 50), canvas.height/2);
    else
      ctx.fillText("Wave " + wave, ((canvas.width/2)), canvas.height/2);
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
    for(i = 0; i < (maxHp - hp); i++)
      hpDisplay += " ";
    hpDisplay += "]";
  }

  ///////////////////////////////////////////////////////////////////////
  // Enemies
  ///////////////////////////////////////////////////////////////////////

  // Basic Enemy Creator
  createEnemy(xAdjust, height, width, maxVelocity, minVelocity, hp, damage, color){
    let x = Math.random() * (canvas.width - xAdjust) + canvas.width;
    let y = Math.random() * (canvas.height - navFooterHeight - height * 2) + height;
    let dx = (Math.random() - 1) * maxVelocity - minVelocity;
    let dy = (Math.random() - 0.5) * maxVelocity;
    enemyArray.push(new Square(ctx, x, y, width, height, dx, dy, hp, damage, color));
  }

  basicEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 'blue')}
  tankEnemy(){this.createEnemy(canvas.width/3, 60, 60, 1, .5, 2, 1, 'green')}
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.font = "40px verdana";
    ctx.fillText("Choose a Perk", ((canvas.width/2) - 140), canvas.height/2 - 140);

    // Randomize which perks are available
    let width = 120;
    let height = width;
    let perk1 = availablePerks[Math.floor(Math.random() * availablePerks.length)];
    let perk2 = availablePerks[Math.floor(Math.random() * availablePerks.length)];
    while(perk2 === perk1){perk2 = availablePerks[Math.floor(Math.random() * availablePerks.length)]}
    let perk3 = availablePerks[Math.floor(Math.random() * availablePerks.length)];
    while(perk3 === perk1 || perk3 === perk2){perk3 = availablePerks[Math.floor(Math.random() * availablePerks.length)]}

    // Display chosen random perks
    perkArray.push(new Square(ctx, ((canvas.width/4)-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'yellow'), perk1);
    perkArray.push(new Square(ctx, ((canvas.width/4)*2-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'green'), perk2);
    perkArray.push(new Square(ctx, ((canvas.width/4)*3-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'blue'), perk3);
    perkArray[0].update();
    ctx.fillStyle = "black";
    ctx.fillText(perk1, (canvas.width/4)-(width/2), (canvas.height/2 + height));
    perkArray[2].update();
    ctx.fillStyle = "black";
    ctx.fillText(perk2, (canvas.width/4)*2-(width/2), (canvas.height/2 + height));
    perkArray[4].update();
    ctx.fillStyle = "black";
    ctx.fillText(perk3, (canvas.width/4)*3-(width/2), (canvas.height/2 + height));
  }

  // Perk Switch Statement
  activatePerk(perk){
    switch(perk){
      case 'aoe': this.aoePerk(); break;
      case 'pierce': this.piercePerk(); break;
      case 'maxhp': this.maxhpPerk(); break;
      case 'dmg +1': this.dmgPerk(); break;
      case 'orbital': this.orbitalPerk(); break;
      case 'regen': this.regenPerk(); break;
      case 'orbUp': this.upgradeOrbPerk(); break;
      default: break;
    }
  }

  // Perk Methods
  aoePerk(){
    aoeSize += 20;
    if(aoeSize > 120)
      availablePerks.splice(availablePerks.indexOf('aoe'), 1);
  }
  piercePerk(){
    hasPierce = true;
    availablePerks.splice(availablePerks.indexOf('pierce'), 1);
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
    if(orbitArray.length === 0)
      availablePerks.push('orbUp')
    orbitArray.push(new Orbital(ctx, orbitalLevel))
  }
  regenPerk(){
    regen = Math.max(1,Math.floor(1000/(regenTime+200)));
    regenTime = Math.floor(2*(regenTime/3));
    console.log(regen + " " + regenTime)
  }
  upgradeOrbPerk(){
    orbitalLevel++;
    for(var i = 0; i < orbitArray.length; i++)
      orbitArray[i].upgrade();
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
      if(!gameover && !waitForPerk && !firstTime){
        this.animate();
      }
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Regen
    if(time%(regenTime+50) === 0 && regen > 0){
      console.log(regenTime)
      if(hp < maxHp){
        hp += regen;
        textArray.push(new Txt(ctx,'+'+regen, 14+(11*hp), 20, (regen*2)+16, 'green', time+100));
        if(hp > maxHp)
          hp = maxHp;
        this.adjustHpDisplay();
      }
    }

    // Take Damage
    for(var i = 0; i < enemyArray.length; i++){
      enemyArray[i].update();
      if(enemyArray[i].state.x <= 0){
        hp-= enemyArray[i].state.damage;
        enemyArray.splice(i,1);
        this.adjustHpDisplay();
        if(hp <= 0)
          gameover = true;
      }
    }

    // Starting a new wave
    if(enemyArray.length === 0 && !waveStarted){
      waveStartTime = time + waveBannerDisplayTime;
      waveStarted = true;
    }
    if(waveStartTime > time){this.waveBanner(waveStartTime - time)}
    if(waveStartTime === time){
      this.newWave();
      waveStarted = false;
    }

    // Orbital
    if(orbitArray.length > 0){
      for(var i = 0; i < orbitArray.length; i++){
        let o = orbitArray[i];
        o.update(x, y, time/10);
        if(o.state.timeout < time){
          o.state.color = o.state.originalColor;
          if(this.damageEnemy(o.state.x, o.state.y, o.state.width, o.state.height, o.state.damage, true)){
            o.setTimeout(time);
          }
        }
      }
    }

    // Aoe Explosion
    if(aoeTime > time){
      ctx.fillStyle = "rgba(255, 99, 71, 0.5)";
      ctx.fillRect(aoeX - aoeSize, aoeY - aoeSize, 2 * aoeSize, 2 * aoeSize);
    }

    // HUD
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    ctx.fillText("Wave: " + (wave-1), 10, 25);
    ctx.fillText("Kills: " + kills, 120, 25);
    ctx.fillText("Time: " + time, 240, 25);
    time++;

    // Hp Display
    ctx.fillStyle = "lightgreen";
    ctx.font = "20px courier";
    ctx.fillText(hpDisplay, 10, 50);

    // Create Text/Dmg number
    if(textArray.length > 0){
      for(i = textArray.length - 1; i >= 0; i--){
        textArray[i].update();
        if(textArray[i].state.time < time)
          textArray.splice(i,1);
      }
    }

    // gameover screen
    if(gameover){
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      startSquare = new Square(ctx, ((canvas.width/2) - 80), ((canvas.height/2) + 25), 160, 50, 0, 0, 1, 1, 'rgba(255, 255, 255, 0.5)');
      startSquare.update();
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.font = "100px verdana";
      ctx.fillText("Game Over", ((canvas.width/2) - 285), canvas.height/2);
      ctx.font = "40px verdana";
      ctx.fillText("Restart", ((canvas.width/2) - 80), ((canvas.height/2) + 65));
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
