import React, {Component} from "react";
import classNames from "classnames";
import Square from "./square";
import Txt from "./txt";
import Orbital from "./orbital";
import Turret from "./turret";
import Star from "./star";
import Laser from "./laser";
import gameScreen from "./gameScreen";

const navFooterHeight = 44;

// cDefense default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'hidden',
  opacity: 0,
}

// Game variables
var stars;
var x;
var y;
var time;
var hpDisplay;
var cdDisplay;
var defaultCdDisplay ;
var kills;
var killCount;
var firstTime = true;
var wave;
var waveStartTime;
var waveStarted;
var waitForPerk;
var canvas;
var ctx;
var startSquare;
var enemyArray;
var slotArray;
var textArray;
var orbitArray;
var turretArray;
var availablePerks;
var availableSkills;
var skill;
var gameover;

// Wave Banner DisplayTime
const waveBannerDisplayTime = 300;

// Perk variables
var hp;
var maxHp;
var shield;
var aoeSize;
var hasPierce;
var damage;
var regen;
var orbitalLevel;
var regenTime;

// Skill variables
var cd;
var maxCd;
var cdRegen;
var skillLevel;
var stasisField;

var laser = undefined;

// aoe variables
var aoeX;
var aoeY;
var aoeTime;

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
    stars = {
      array: [],
      amount: 40,
    };
  	for(var i = 0; i < stars.amount; i++) {
  		var x = Math.round(Math.random() * canvas.width);
  		var y = Math.round(Math.random() * canvas.height);
  		var star = new Star(ctx, x, y, Math.floor(Math.random()*10)+4);
  		stars.array.push(star);
  	}

    // Start screen
    startSquare = gameScreen.startScreen(ctx, canvas, startSquare);
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
    slotArray = [];
    orbitArray = [];
    turretArray = [];
    waveStarted = false;
    waitForPerk = false;
    time = 0;
    kills = {
      blue: 0,
      green: 0,
      purple: 0,
      yellow: 0,
      grey: 0,
      orange: 0,
      white: 0,
      black: 0,
    };
    killCount = 0;
    wave = 1;
    cdDisplay = "";
    laser = undefined;
    // Default Perks
    availablePerks = [
      'aoe', 'increase the size of your click',
      'pierce', 'allows you to hit multiple enemies',
      'maxhp', 'increases your maximum health by x2',
      'dmg +1', 'increase click damage by 1',
      'orbital', 'summons orbitals to orbit around your mouse',
      'shield','Energy shield that recharges after not getting hit'
    ]; //'regen', 'allows you to regen your life over time'];
    availableSkills = [
      'turret', 'Press space to spawn a turret',
      'laser', 'Press space to shoot a laser',
      'stasis', 'Press space, then click to spawn a stasis field or press space again to cancel'
    ];
    hp = 5;
    maxHp = 5;
    shield = {
      current: 0,
      max: 0,
      timeout: 0,
      display: '',
    };
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
    stasisField = {
      indicatorOn: false,
      width: 300,
      height: 300,
      x: 0,
      y: 0,
      timeout: 0,
      damage: 1,
      slowAmount: 50,
      stunChance: .25,
      damageChance: .002,
    }
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
    if(stasisField.indicatorOn){
      cd = 0;
      this.adjustCdDisplay();
      stasisField.indicatorOn = false;
      stasisField.x = x - stasisField.width/2;
      stasisField.y = y - stasisField.height/2;
      stasisField.timeout = time + 1000;
    }
  }
  _onKeyDown(e){
    if(skill !== '' && e.key === ' '){
      switch(skill){
        case 'turret': this.placeTurret(); break;
        case 'laser': this.shootLaser(); break;
        case 'stasis': this.stasisField(); break;
        default: break;
      }
    }
  }

  // This method needs to be refactored to be cleaner and more modular
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
              if(isEnemy){
                killCount++;
                this.addKill(array[i].state);
              }
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

  hitDetect(unit1, unit2){
    if(unit1.x + unit1.width > unit2.x && unit1.x < unit2.x + unit2.width){
      if(unit1.y + unit1.height > unit2.y && unit1.y < unit2.y + unit2.height){
        return true;
      }
    }
    return false;
  }

  addKill(unit){
    switch(unit.color){
      case 'blue': kills = {...kills, blue: kills.blue+1}; break;
      case 'green': kills = {...kills, green: kills.green+1}; break;
      case 'purple': kills = {...kills, purple: kills.purple+1}; break;
      case 'yellow': kills = {...kills, yellow: kills.yellow+1}; break;
      case 'grey': kills = {...kills, grey: kills.grey+1}; break;
      case 'orange': kills = {...kills, orange: kills.orange+1}; break;
      case 'white': kills = {...kills, white: kills.white+1}; break;
      case 'black': kills = {...kills, black: kills.black+1}; break;
      default: break;
    }
  }

  ///////////////////////////////////////////////////////////////////////
  // Enemies
  ///////////////////////////////////////////////////////////////////////

  // Basic Enemy Creator
  createEnemy(xAdjust, height, width, maxVelocity, minVelocity, hp, damage, yVelocity, color){
    let x = Math.random() * (canvas.width - xAdjust) + canvas.width;
    let y = Math.random() * (canvas.height - navFooterHeight - height * 2) + height;
    let dx = (Math.random() - 1) * maxVelocity - minVelocity;
    let dy = (Math.random() - 0.5) * yVelocity + 0.5 * yVelocity;
    enemyArray.push(new Square(ctx, x, y, width, height, dx, dy, hp*(Math.ceil(wave/10)), damage*(Math.ceil(wave/10)), color));
  }

  // xAdjust, height, width, maxVelocity, minVelociy, hp, damage, yVelocity,color
  basicEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 0, 'blue')};
  tankEnemy(){this.createEnemy(canvas.width/2, 60, 60, .7, .5, 5, 1, 0, 'green')};
  fastEnemy(){this.createEnemy(0, 40, 40, 2, 2, 1, 1, 0, 'purple')};
  smallEnemy(){this.createEnemy(0, 20, 20, 1, 1, 1, 1, 0, 'yellow')};
  minibossEnemy(){this.createEnemy(0, 80, 80, .5, .5, 20, 5, 0, 'grey')};
  zagEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 1, 'orange')};
  teleportEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 0, 'white')};
  stealthEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 0, 'black')};

  spawnEnemy(type, amount){
    for(var i = 0; i < amount; i++){
      switch(type){
        case 'tank': this.tankEnemy(); break;
        case 'fast': this.fastEnemy(); break;
        case 'small': this.smallEnemy(); break;
        case 'miniboss': this.minibossEnemy(); break;
        case 'zag': this.zagEnemy(); break;
        case 'teleport': this.teleportEnemy(); break;
        case 'stealth': this.stealthEnemy(); break;
        default: this.basicEnemy(); break;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////
  // Waves
  ///////////////////////////////////////////////////////////////////////

  // New Wave mechanics
  newWave(){
    this.newPerkSkill();
    if(wave <= 10){
      if(wave === 1){
        this.spawnEnemy('basic',20);
      }
      if(wave === 2){
        this.spawnEnemy('tank',20);
        this.spawnEnemy('basic',20);
      }
      if(wave === 3){
        this.spawnEnemy('tank',20);
        this.spawnEnemy('small',20);
      }
      if(wave === 4){
        this.spawnEnemy('tank',10);
        this.spawnEnemy('basic',10);
        this.spawnEnemy('fast',30);
      }
      if(wave === 5){
        this.spawnEnemy('miniboss',15);
        this.spawnEnemy('tank',20);
        this.spawnEnemy('basic',20);
        this.spawnEnemy('fast',10);
        this.spawnEnemy('small',10);
      }
      if(wave === 6){
        this.spawnEnemy('tank',20);
        this.spawnEnemy('basic',30);
        this.spawnEnemy('stealth',10);
      }
      if(wave === 7){
        this.spawnEnemy('tank',30);
        this.spawnEnemy('zag',20);
        this.spawnEnemy('fast',20);
      }
      if(wave === 8){
        this.spawnEnemy('basic',20);
        this.spawnEnemy('small',20);
        this.spawnEnemy('teleport',30);
      }
      if(wave === 9){
        this.spawnEnemy('zag',30);
        this.spawnEnemy('small',20);
        this.spawnEnemy('fast',10);
      }
      if(wave === 10){
        this.spawnEnemy('miniboss',20);
        this.spawnEnemy('tank',20);
        this.spawnEnemy('basic',20);
        this.spawnEnemy('zag',30);
        this.spawnEnemy('small',20);
        this.spawnEnemy('teleport',20);
        this.spawnEnemy('fast',20);
        this.spawnEnemy('stealth',5);
      }
    }
    else{
      for(var i = 0; i < 70 + wave; i++){
        let randNum = Math.floor(Math.random()*7);
        if(randNum === 3 && Math.random() > 0.04*wave){
          randNum = Math.floor(Math.random()*7);
        }
        switch(randNum){
          case 0: this.tankEnemy(); break;
          case 1: this.fastEnemy(); break;
          case 2: this.smallEnemy(); break;
          case 3: this.minibossEnemy(); break;
          case 4: this.zagEnemy(); break;
          case 5: this.teleportEnemy(); break;
          case 6: this.stealthEnemy(); break;
          default: this.basicEnemy(); break;
        }
      }
    }
    wave++;
  }

  ///////////////////////////////////////////////////////////////////////
  // Hp / Cd / Shield HUD
  ///////////////////////////////////////////////////////////////////////

  adjustHpDisplay(){
    hpDisplay = "    Hp[";
    for(var i = 0; i < hp; i++)
      hpDisplay += "I";
    for(i = 0; i < (maxHp - hp); i++)
      hpDisplay += " ";
    hpDisplay += "]";
  }
  adjustCdDisplay(){
    if(maxCd > 0){
      cdDisplay = defaultCdDisplay;
      for(var i = 0; i < cd; i++)
        cdDisplay += "I";
      for(i = 0; i < (maxCd - cd); i++)
        cdDisplay += " ";
      cdDisplay += "]";
    }
  }
  adjustShieldDisplay(){
    if(shield.max > 0){
      shield.display = "Shield[";
      for(var i = 0; i < shield.current; i++)
        shield.display += "I";
      for(i = 0; i < (shield.max - shield.current); i++)
        shield.display += " ";
      shield.display += "]";
    }
  }

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
    var desc1;
    var slot2;
    var desc2;
    var slot3;
    var desc3;
    var randNum;
    if(wave%5===0){
      randNum = Math.floor(Math.random()*availableSkills.length/2)*2;
      slot1 = availableSkills[randNum];
      desc1 = availableSkills[randNum+1];
      randNum = Math.floor(Math.random()*availableSkills.length/2)*2;
      slot2 = availableSkills[randNum];
      desc2 = availableSkills[randNum+1];
      while(slot2 === slot1){
        randNum = Math.floor(Math.random()*availableSkills.length/2)*2;
        slot2 = availableSkills[randNum];
        desc2 = availableSkills[randNum+1];
      }
      randNum = Math.floor(Math.random()*availableSkills.length/2)*2;
      slot3 = availableSkills[randNum];
      desc3 = availableSkills[randNum+1];
      while(slot3 === slot1 || slot3 === slot2){
        randNum = Math.floor(Math.random()*availableSkills.length/2)*2;
        slot3 = availableSkills[randNum]
        desc3 = availableSkills[randNum+1];
      }
    } else{
      randNum = Math.floor(Math.random()*availablePerks.length/2)*2;
      slot1 = availablePerks[randNum];
      desc1 = availablePerks[randNum+1];
      randNum = Math.floor(Math.random()*availablePerks.length/2)*2;
      slot2 = availablePerks[randNum];
      desc2 = availablePerks[randNum+1];
      while(slot2 === slot1){
        randNum = Math.floor(Math.random()*availablePerks.length/2)*2;
        slot2 = availablePerks[randNum];
        desc2 = availablePerks[randNum+1];
      }
      randNum = Math.floor(Math.random()*availablePerks.length/2)*2;
      slot3 = availablePerks[randNum];
      desc3 = availablePerks[randNum+1];
      while(slot3 === slot1 || slot3 === slot2){
        randNum = Math.floor(Math.random()*availablePerks.length/2)*2;
        slot3 = availablePerks[randNum];
        desc3 = availablePerks[randNum+1];
      }
    }

    // Display chosen random perks/skills
    slotArray.push(new Square(ctx, ((canvas.width/4)-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'yellow'), slot1);
    slotArray.push(new Square(ctx, ((canvas.width/4)*2-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'green'), slot2);
    slotArray.push(new Square(ctx, ((canvas.width/4)*3-(width/2)), canvas.height/2, width, width, 0, 0, 1, 0, 'blue'), slot3);
    slotArray[0].update();

    ctx.fillStyle = 'yellow';
    ctx.fillRect(canvas.width/4-width/2, canvas.height - 280, canvas.width-canvas.width/2 + width, 50);
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width/4-width/2, canvas.height - 190, canvas.width-canvas.width/2 + width, 50);
    ctx.fillStyle = 'blue';
    ctx.fillRect(canvas.width/4-width/2, canvas.height - 100, canvas.width-canvas.width/2 + width, 50);

    ctx.fillStyle = "black";
    ctx.fillText(slot1, (canvas.width/4)-(width/2), (canvas.height/2 + height));
    slotArray[2].update();
    ctx.fillStyle = "black";
    ctx.fillText(slot2, (canvas.width/4)*2-(width/2), (canvas.height/2 + height));
    slotArray[4].update();
    ctx.fillStyle = "black";
    ctx.fillText(slot3, (canvas.width/4)*3-(width/2), (canvas.height/2 + height));

    ctx.fillStyle = "black";
    ctx.font = "20px verdana";
    ctx.fillText(desc1, canvas.width/4-width/2, canvas.height - 240);
    ctx.fillText(desc2, canvas.width/4-width/2, canvas.height - 150);
    ctx.fillText(desc3, canvas.width/4-width/2, canvas.height - 60);
  }

  // Perk Switch Statement
  activatePerkSkill(perkSkill){
    switch(perkSkill){
      case 'aoe': this.aoePerk(); break;
      case 'pierce': this.piercePerk(); break;
      case 'maxhp': this.maxhpPerk(); break;
      case 'shield': this.energyShieldPerk(); break;
      case 'dmg +1': this.dmgPerk(); break;
      case 'orbital': this.orbitalPerk(); break;
      case 'regen': this.regenPerk(); break;
      case 'orbUp': this.upgradeOrbPerk(); break;
      case 'turret': this.turretSkill(); break;
      case 'laser': this.laserSkill(); break;
      case 'stasis': this.stasisSkill(); break;
      default: break;
    }
  }

  // Perk Methods
  aoePerk(){
    aoeSize += 10;
    if(aoeSize > 120)
      availablePerks.splice(availablePerks.indexOf('aoe'), 2);
  }
  piercePerk(){
    hasPierce = true;
    availablePerks.splice(availablePerks.indexOf('pierce'), 2);
  }
  maxhpPerk(){
    hp += maxHp;
    maxHp += maxHp;
    this.adjustHpDisplay();
    if(maxHp >= 20){
      availablePerks.splice(availablePerks.indexOf('maxhp'), 2);
    }
  }
  energyShieldPerk(){
    shield.current += 3;
    shield.max += 3;
    this.adjustShieldDisplay();
    if(shield.max >= 15){
      availablePerks.splice(availablePerks.indexOf('shield'), 2);
    }
  }
  dmgPerk(){
    damage++;
  }
  orbitalPerk(){
    if(orbitArray.length === 0){
      availablePerks.push('orbUp')
      availablePerks.push('increase orb size and damage')
    }
    orbitArray.push(new Orbital(ctx, orbitalLevel));
    orbitArray.push(new Orbital(ctx, orbitalLevel));
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
  energyShieldPerk(){
    shield.current += 3;
    shield.max += 3;
    this.adjustShieldDisplay();
  }

  turretSkill(){
    skill = 'turret';
    cd = 1;
    maxCd = 3;
    cdRegen = 750;
    skillLevel++;
    defaultCdDisplay = 'Charges[';
    availableSkills = ['upgrade1', 'desc1', 'upgrade2', 'desc2', 'upgrade3', 'desc3'];
    this.adjustCdDisplay();
  }
  laserSkill(){
    skill = 'laser';
    cd = 5;
    maxCd = 10;
    cdRegen = 150;
    skillLevel++;
    defaultCdDisplay = '    Cd[';
    availableSkills = ['upgrade1', 'desc1', 'upgrade2', 'desc2', 'upgrade3', 'desc3'];
    this.adjustCdDisplay();
  }
  stasisSkill(){
    skill = 'stasis';
    cd = 3;
    maxCd = 5;
    cdRegen = 500;
    skillLevel++;
    defaultCdDisplay = '    Cd[';
    availableSkills = ['upgrade1', 'desc1', 'upgrade2', 'desc2', 'upgrade3', 'desc3'];
    this.adjustCdDisplay();
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
  stasisField(){
    if(cd === maxCd)
      stasisField.indicatorOn = !stasisField.indicatorOn;
  }
  stasisFieldCalc(unit){
    if(stasisField.timeout > time && !unit.state.dead){
      if(this.hitDetect(unit.state, stasisField)){
        if(Math.random() < stasisField.stunChance)
          unit.state.x = unit.state.x - unit.state.dx;
        else
          unit.state.x = unit.state.x - stasisField.slowAmount*unit.state.dx/100;
        if(Math.random() < stasisField.damageChance){
          unit.state.hp -= stasisField.damage;
          textArray.push(new Txt(ctx, stasisField.damage, unit.state.x, unit.state.y, stasisField.damage+11,'red', time+100));
          if(unit.state.hp <= 0)
            unit.death(time);
        }
      }
    }
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
    for(var i = 0; i < stars.array.length; i++){
      stars.array[i].update();
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

    // Shield Regen
    if(shield.max > 0 && shield.timeout < time){
      if(shield.current < shield.max){
        if(time%50 === 0){
          shield.current += 1;
          this.adjustShieldDisplay();
        }
      }
    }

    // cdRegen
    if(skill !== '' && time%cdRegen === 0){
      if(cd < maxCd){
        cd++;
        this.adjustCdDisplay();
      }
    }

    // Take Damage / Stasis Field Effect / Enemy Update
    for(i = enemyArray.length-1; i >= 0; i--){
      this.stasisFieldCalc(enemyArray[i]);
      enemyArray[i].update(time);
      if(enemyArray[i].state.x <= 0 && !enemyArray[i].state.dead){
        let dmg = enemyArray[i].state.damage;
        if(shield.current != 0){
          let s = shield.current;
          shield.current -= dmg;
          shield.timeout = time + 500;
          if(shield.current < 0){
            shield.current = 0;
            dmg = dmg - s;
          }
          else {
            dmg = 0;
          }
        }
        hp-= dmg;
        enemyArray[i].death(time);
        this.adjustHpDisplay();
        this.adjustShieldDisplay();
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
    if(waveStartTime > time){gameScreen.waveBanner(ctx, canvas, wave, waveStartTime - time)}
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

    // Click aoe indicator
    if(aoeTime > time){
      ctx.fillStyle = "rgba(255, 99, 71, 0.5)";
      ctx.fillRect(aoeX - aoeSize, aoeY - aoeSize, 2 * aoeSize, 2 * aoeSize);
    }

    // Stasis Field Aoe indicator
    if(stasisField.indicatorOn){
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillRect(x - stasisField.width/2, y - stasisField.height/2, stasisField.width, stasisField.height);
    }
    // Stasis Field
    if(stasisField.timeout > time){
      ctx.fillStyle = "rgba(100, 100, 255, 0.5)";
      ctx.fillRect(stasisField.x, stasisField.y, stasisField.width, stasisField.height);
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
    ctx.fillText("Wave: " + (wave-1), 60, 25);
    ctx.fillText("Kills: " + killCount, 170, 25);
    ctx.fillText("Time: " + time, 290, 25);
    time++;
    // Hp Display
    ctx.fillStyle = "lightgreen";
    ctx.font = "20px courier";
    ctx.fillText(hpDisplay, 10, 50);
    // Shield Display
    ctx.fillStyle = "lightblue";
    ctx.font = "20px courier";
    ctx.fillText(shield.display, 10, 75);
    // cd Display
    ctx.fillStyle = "rgb(238,196,20)";
    if(shield.max > 0)
      ctx.fillText(cdDisplay, 10, 100);
    else
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
      startSquare = gameScreen.gameover(ctx, canvas, kills, wave, startSquare);
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
