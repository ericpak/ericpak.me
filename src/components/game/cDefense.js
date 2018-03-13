import React, {Component} from "react";
import classNames from "classnames";
import Square from "./square";
import Txt from "./txt";
import Orbital from "./orbital";
import Turret from "./turret";
import Star from "./star";
import Laser from "./laser";

const navFooterHeight = 44;

// cDefense default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'hidden',
  opacity: 0,
}

// Game variables
var stars = [];
var numStars = 100;
var x = 0;
var y = 0;
var time = 0;
var hpDisplay = "[III]";
var cdDisplay = "";
var kills = 0;
var firstTime = true;
var wave = 1;
var waveStartTime = 0;
var waveStarted = false;
var waitForPerk = false;
var canvas = undefined;
var ctx = undefined;
var startSquare = undefined;
var enemyArray = [];
var slotArray = [];
var textArray = [];
var orbitArray = [];
var turretArray = [];
var availablePerks = ['aoe', 'pierce', 'maxhp', 'dmg +1', 'orbital', 'regen'];
var availableSkills = ['turret', 'laser', 'bomb'];
var skill = '';
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

// Skill variables
var cd = 0;
var maxCd = 0;
var cdRegen = 0;
var skillLevel = 0;

var laser = undefined;

// aoe variables
var aoeX = 0;
var aoeY = 0;
var aoeTime = 0;

class CDefense extends Component {
  getClassName() {
    return classNames("CDefense");
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

  componentDidMount() {
    canvas = this.refs.canvas;
    firstTime = true;
    this.setDefaults();
    this.adjustHpDisplay();
    window.addEventListener('keydown',this._onKeyDown.bind(this),false);
    // Game Size
    canvas.width = 1400;
    canvas.height = 900;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  	// Create all the stars
  	for(var i = 0; i < numStars; i++) {
  		var x = Math.round(Math.random() * canvas.width);
  		var y = Math.round(Math.random() * canvas.height);
  		var star = new Star(ctx, x, y, Math.floor(Math.random()*10)+4);
  		stars.push(star);
  	}

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
    this.laserSkill();
  }

  setDefaults(){
    // Default Game Variables
    enemyArray = [];
    textArray = [];
    slotArray = [];
    orbitArray = [];
    turretArray = [];
    waveStarted = false;
    waitForPerk = false;
    time = 0;
    kills = 0;
    wave = 1;
    cdDisplay = "";
    laser = undefined;
    // Default Perks
    availablePerks = ['aoe', 'pierce', 'maxhp', 'dmg +1', 'orbital', 'regen'];
    availableSkills = ['turret', 'laser', 'bomb'];
    hp = 5;
    maxHp = 5;
    aoeSize = 0;
    hasPierce = false;
    damage = 1;
    regen = 0;
    orbitalLevel = 1;
    regenTime = 1425;
    // Default Skills
    cd = 0;
    maxCd = 0;
    cdRegen = 0;
    skillLevel = 0;
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
      for(var i = 0; i < slotArray.length; i+=2){
        if(e.nativeEvent.offsetX >= slotArray[i].state.x && e.nativeEvent.offsetX <= slotArray[i].state.x + slotArray[i].state.width){
          if(e.nativeEvent.offsetY >= slotArray[i].state.y && e.nativeEvent.offsetY <= slotArray[i].state.y + slotArray[i].state.height){
            this.activatePerkSkill(slotArray[i+1]);
            slotArray = [];
            waitForPerk = false;
            this.animate();
          }
        }
      }
    } else {
      this.aoeExplosion(e.nativeEvent.offsetX, e.nativeEvent.offsetY, time);
      this.hitDetection(enemyArray, e.nativeEvent.offsetX-aoeSize, e.nativeEvent.offsetY-aoeSize, 2*aoeSize, 2*aoeSize, damage, hasPierce, true, false);
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
    if(skill !== '' && e.key === ' '){
      switch(skill){
        case 'turret': this.placeTurret(); break;
        case 'laser': this.shootLaser(); break;
        case 'bomb': this.dropBomb(); break;
        default: break;
      }
    }
  }

  hitDetection(array, x, y, width, height, dmg, hasPierce, isEnemy, isLaser){
    var hit = false;
    for(var i = 0; i < array.length; i++){
      if(!array[i].state.dead){
        if(x + width >= array[i].state.x && x <= array[i].state.x + array[i].state.width){
          if(y + height >= array[i].state.y && y <= array[i].state.y + array[i].state.height){
            array[i].state.hp -= dmg;
            hit = true;
            if(isLaser)
              textArray.push(new Txt(ctx, dmg, array[i].state.x, array[i].state.y, damage+11,'red', time+100));
            else
              textArray.push(new Txt(ctx, dmg, x, y, damage+11, 'red', time+100));
            if(array[i].state.hp <= 0){
              array[i].death(time);
              if(isEnemy)
                kills++;
            }
            if(!hasPierce){
              break;
            }
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
    this.newPerkSkill();
    // Wave 1 or 5+
    if((wave)%10 === 1 || (wave)%10 >= 5){
      let numberOfEnimies = 10;
      for(var i = 0; i < (wave * numberOfEnimies); i++)
        this.basicEnemy();
    }
    // Wave 2
    if((wave)%10 === 1 || (wave)%10 >= 6){
      let numberOfEnimies = 30;
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

  ///////////////////////////////////////////////////////////////////////
  // Hp / Cd HUD
  ///////////////////////////////////////////////////////////////////////

  adjustHpDisplay(){
    hpDisplay = "[";
    for(var i = 0; i < hp; i++)
      hpDisplay += "I";
    for(i = 0; i < (maxHp - hp); i++)
      hpDisplay += " ";
    hpDisplay += "]";
  }
  adjustCdDisplay(){
    if(maxCd > 0){
      cdDisplay = "[";
      for(var i = 0; i < cd; i++)
        cdDisplay += "I";
      for(i = 0; i < (maxCd - cd); i++)
        cdDisplay += " ";
      cdDisplay += "]";
    }
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
  tankEnemy(){this.createEnemy(canvas.width/3, 60, 60, .5, .2, 2, 1, 'green')}
  fastEnemy(){this.createEnemy(0, 40, 40, 2, 2, 1, 1, 'purple')}
  smallEnemy(){this.createEnemy(0, 20, 20, 1, 1, 1, 1, 'yellow')}
  bossEnemy(){this.createEnemy(0, 80, 80, .5, .5, 20, 5, 'white')}



  ///////////////////////////////////////////////////////////////////////
  // Perks / Skills
  ///////////////////////////////////////////////////////////////////////

  // New Perk/Skill Screen
  newPerkSkill(){
    waitForPerk = true;

    // New perk/skill screen
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.font = "40px verdana";
    ctx.fillText("Choose a Perk", ((canvas.width/2) - 140), canvas.height/2 - 140);

    // Randomize which perks/skills are available
    let width = 120;
    let height = width;
    var slot1;
    var slot2;
    var slot3;
    if(wave%2===0){
      slot1 = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      slot2 = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      while(slot2 === slot1){slot2 = availableSkills[Math.floor(Math.random() * availableSkills.length)]}
      slot3 = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      while(slot3 === slot1 || slot3 === slot2){slot3 = availableSkills[Math.floor(Math.random() * availableSkills.length)]}
    } else{
      slot1 = availablePerks[Math.floor(Math.random() * availablePerks.length)];
      slot2 = availablePerks[Math.floor(Math.random() * availablePerks.length)];
      while(slot2 === slot1){slot2 = availablePerks[Math.floor(Math.random() * availablePerks.length)]}
      slot3 = availablePerks[Math.floor(Math.random() * availablePerks.length)];
      while(slot3 === slot1 || slot3 === slot2){slot3 = availablePerks[Math.floor(Math.random() * availablePerks.length)]}
    }

    // Display chosen random perks/skills
    slotArray.push(new Square(ctx, ((canvas.width/4)-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'yellow'), slot1);
    slotArray.push(new Square(ctx, ((canvas.width/4)*2-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'green'), slot2);
    slotArray.push(new Square(ctx, ((canvas.width/4)*3-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'blue'), slot3);
    slotArray[0].update();
    ctx.fillStyle = "black";
    ctx.fillText(slot1, (canvas.width/4)-(width/2), (canvas.height/2 + height));
    slotArray[2].update();
    ctx.fillStyle = "black";
    ctx.fillText(slot2, (canvas.width/4)*2-(width/2), (canvas.height/2 + height));
    slotArray[4].update();
    ctx.fillStyle = "black";
    ctx.fillText(slot3, (canvas.width/4)*3-(width/2), (canvas.height/2 + height));
  }

  // Perk Switch Statement
  activatePerkSkill(perkSkill){
    switch(perkSkill){
      case 'aoe': this.aoePerk(); break;
      case 'pierce': this.piercePerk(); break;
      case 'maxhp': this.maxhpPerk(); break;
      case 'dmg +1': this.dmgPerk(); break;
      case 'orbital': this.orbitalPerk(); break;
      case 'regen': this.regenPerk(); break;
      case 'orbUp': this.upgradeOrbPerk(); break;
      case 'turret': this.turretSkill(); break;
      case 'laser': this.laserSkill(); break;
      case 'bomb': this.bombSkill(); break;
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
    orbitArray.push(new Orbital(ctx, orbitalLevel))
  }
  regenPerk(){
    regen = Math.max(1,Math.floor(1000/(regenTime+200)));
    regenTime = Math.floor(2*(regenTime/3));
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

  turretSkill(){
    skill = 'turret';
    cd = 1;
    maxCd = 3;
    cdRegen = 750;
    skillLevel++;
    availableSkills = ['tup1','tup2','tup3'];
    this.adjustCdDisplay();
  }
  laserSkill(){
    skill = 'laser';
    cd = 5;
    maxCd = 10;
    cdRegen = 150;
    skillLevel++;
    availableSkills = ['lUp1','lUp2','lUp3'];
    this.adjustCdDisplay();
  }
  bombSkill(){
    skill = 'bomb';
    availableSkills = ['bUp1', 'bUp2','bUp3'];
  }

  placeTurret(){
    if(cd !== 0){
      cd--;
      this.adjustCdDisplay();
      turretArray.push(new Turret(ctx, x, y, skillLevel));
    }
  }
  shootLaser(){
    if(cd === maxCd){
      cd = 0;
      this.adjustCdDisplay();
      laser = new Laser(ctx, x, y, skillLevel, canvas.width);
    }
  }
  dropBomb(){

  }

  ///////////////////////////////////////////////////////////////////////
  // Animate
  ///////////////////////////////////////////////////////////////////////

  animate() {
    window.requestAnimationFrame(() => {
      if(!gameover && !waitForPerk && !firstTime){
        this.animate();
      }
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stars
    for(var i = 0; i < stars.length; i++){
      stars[i].update();
    }

    // Regen
    if(time%(regenTime+50) === 0 && regen > 0){
      if(hp < maxHp){
        hp += regen;
        textArray.push(new Txt(ctx,'+'+regen, 14+(11*hp), 20, (regen*2)+16, 'green', time+100));
        if(hp > maxHp)
          hp = maxHp;
        this.adjustHpDisplay();
      }
    }

    // cdRegen
    if(skill !== '' && time%cdRegen === 0){
      if(cd < maxCd){
        cd++;
        this.adjustCdDisplay();
      }
    }

    // Take Damage / Enemy Update
    for(i = enemyArray.length-1; i >= 0; i--){
      enemyArray[i].update(time);
      if(enemyArray[i].state.x <= 0 && !enemyArray[i].state.dead){
        hp-= enemyArray[i].state.damage;
        enemyArray[i].death(time);
        this.adjustHpDisplay();
        if(hp <= 0)
          gameover = true;
      }
      if(enemyArray[i].state.dead && enemyArray[i].state.timeout < time){
        enemyArray.splice(i,1);
      }
    }

    // Turret
    if(turretArray.length > 0){
      for(i = turretArray.length-1; i >= 0; i--){
        let t = turretArray[i];
        t.update(time);
        let ba = t.state.bulletArray;
        for(var j = ba.length-1; j >= 0; j--){
          if(this.hitDetection(enemyArray, ba[j].state.x, ba[j].state.y, ba[j].state.width, ba[j].state.height, t.state.damage, t.state.pierce, true, false)){
            ba.splice(j,1);
          }
        }
        if(t.state.timeout === 0)
          t.setTimeout(time);
        else if(t.state.timeout < time && !t.state.dead)
          t.death(time);
        else if(t.state.timeout < time && t.state.dead)
          turretArray.splice(i,1);
      }
    }
    for(i = enemyArray.length-1; i >= 0; i--){
      var eArray = enemyArray[i].state;
      this.hitDetection(turretArray, eArray.x, eArray.y, eArray.width, eArray.height, eArray.damage, true, false, false);
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
      for(i = 0; i < orbitArray.length; i++){
        let o = orbitArray[i];
        o.update(x, y, time/10);
        if(o.state.timeout < time){
          o.state.color = o.state.originalColor;
          if(this.hitDetection(enemyArray, o.state.x, o.state.y, o.state.width, o.state.height, o.state.damage, true, true, false)){
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

    // Laser
    if(laser !== undefined){
      if(laser.state.timeout === 0)
        laser.setTimeout(time);
      laser.update(time);
      if(laser.state.timeout - time === 200 || laser.state.timeout - time === 170 || laser.state.timeout - time === 140 || laser.state.timeout - time === 110 || laser.state.timeout - time === 80 || laser.state.timeout - time === 50){
        this.hitDetection(enemyArray, laser.state.x, laser.state.y-laser.state.hitHeight/2, laser.state.hitWidth, laser.state.hitHeight, laser.state.damage, true, true, true);
      }
      if(laser.state.timeout !== 0 && laser.state.timeout < time)
        laser = undefined;
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
    // cd Display
    ctx.fillStyle = "lightblue";
    ctx.fillText(cdDisplay, 10, 75);

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
