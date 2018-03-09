import React, {Component} from "react";
import classNames from "classnames";
import Square from "./square";

const navFooterHeight = 44;

// cDefense default style
var divStyle = {
  top: 0,
  bottom: 0,
  visibility: 'hidden',
  opacity: 0,
}

// Default game values
var score = 0;
var life = 3;
var maxLife = 3;
var lifeDisplay = "[III]";
var kills = 0;
var firstTime = true;
var wave = 1;
var roundStartTime = 0;
var roundStarted = false;


class BallCanvas extends Component {
  getClassName() {
    return classNames("BallCanvas");
  }

  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      canvas: this.refs.canvas,
      ctx: undefined,
      enemyArray: [],
      gameover: false,
    }
  }

  // If canvas mounts
  componentDidMount() {
    this.state.canvas = this.refs.canvas;
    this.state.canvas.width = window.innerWidth;
    this.state.canvas.height = window.innerHeight - navFooterHeight;
    this.state.ctx = this.state.canvas.getContext("2d");
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.state.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    window.addEventListener('resize', this.resizeWindow.bind(this));

    // Start screen
    this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.state.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    this.state.ctx.font = "40px verdana";
    this.state.ctx.fillText("Alpha version", ((window.innerWidth/2) - 140), window.innerHeight/2 - 140);
    this.state.ctx.fillText("Click the squares to kill them", ((window.innerWidth/2) - 295), window.innerHeight/2);
    this.state.ctx.fillText("Protect the left side", ((window.innerWidth/2) - 210), window.innerHeight/2 + 40);
    this.state.ctx.fillText("Click to start", ((window.innerWidth/2) - 150), ((window.innerHeight/2) + 80));
  }

  // Resize canvas to fit window and recreate circles
  resizeWindow(){
    this.state.canvas.width = window.innerWidth;
    this.state.canvas.height = window.innerHeight - navFooterHeight;
  }

  // Mousemove event listener
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  // Mouse click event listener
  _onMouseClick(e) {
    for(var i = 0; i < this.state.enemyArray.length; i++){
      if(e.nativeEvent.offsetX >= this.state.enemyArray[i].state.x && e.nativeEvent.offsetX <= this.state.enemyArray[i].state.x + this.state.enemyArray[i].state.width){
        if(e.nativeEvent.offsetY >= this.state.enemyArray[i].state.y && e.nativeEvent.offsetY <= this.state.enemyArray[i].state.y + this.state.enemyArray[i].state.height){
          if(this.state.enemyArray[i].state.life === 1){
            this.state.enemyArray.splice(i,1);
            kills++;
          } else {
            this.state.enemyArray[i].state.life -= 1;
          }
        }
      }
    }
    if(this.state.gameover || firstTime){
      firstTime = false;
      this.reset();
    }
  }

  reset(){
    this.state.enemyArray = [];
    life = 3;
    maxLife = 3;
    score = 0;
    kills = 0;
    wave = 1;
    this.adjustLifeDisplay();
    this.setState({ gameover: false });
    this.animate();
  }

  waveBanner(time){
    let wtime = time;
    if(time >= 300)
      wtime = 0;
    else if(time >= 200 && time < 300)
      wtime = 300 - time;
    else if(time >= 100 && time < 200)
      wtime = 100;
    else if(time < 100)
      wtime = time;
    this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.state.ctx.fillRect(0, ((window.innerHeight/2) - wtime), window.innerWidth, (2 * wtime));
    this.state.ctx.fillStyle = "rgba(0, 0, 0,"+ (0.7 * wtime) + ")";
    this.state.ctx.font = "80px verdana";
    if(wave%10 === 0)
      this.state.ctx.fillText("Boss Wave", ((window.innerWidth/2) - 50), window.innerHeight/2);
    this.state.ctx.fillText("Wave " + wave, ((window.innerWidth/2)), window.innerHeight/2);
  }

  adjustLifeDisplay(){
    lifeDisplay = "[";
    for(var i = 0; i < life; i++)
      lifeDisplay += "I";
    for(var i = 0; i < (maxLife - life); i++)
      lifeDisplay += " ";
    lifeDisplay += "]";
  }

  ///////////////////////////////////////////////////
  // Enemies
  ///////////////////////////////////////////////////

  // Basic Enemy Creator
  createEnemy(xAdjust, height, width, maxVelocity, minVelocity, life, damage, color){
    let x = Math.random() * (window.innerWidth - xAdjust) + window.innerWidth;
    let y = Math.random() * (window.innerHeight - navFooterHeight - height * 2) + height;
    let dx = (Math.random() - 1) * maxVelocity - minVelocity;
    let dy = (Math.random() - 0.5) * maxVelocity;
    this.state.enemyArray.push(new Square(this.state.ctx, x, y, width, height, dx, dy, life, damage, color));
  }

  basicEnemy(){this.createEnemy(0, 40, 40, 1, 1, 1, 1, 'blue')}
  tankEnemy(){this.createEnemy(window.innerWidth/3, 60, 60, 1, .5, 2, 1, 'green')}
  fastEnemy(){this.createEnemy(0, 40, 40, 2, 2, 1, 1, 'red')}
  smallEnemy(){this.createEnemy(0, 20, 20, 1, 1, 1, 1, 'yellow')}
  bossEnemy(){this.createEnemy(0, 80, 80, .5, .5, 20, 5, 'white')}

  newWave(){
    for(var i = 0; i < (wave * 8); i++)
      this.basicEnemy();
    for(var i = 0; i < (wave * 2); i++)
      this.tankEnemy();
    for(var i = 0; i < (wave * 2); i++)
      this.fastEnemy();
    for(var i = 0; i < (wave * 2); i++)
      this.smallEnemy();
    for(var i = 0; i < (wave * 2); i++)
      this.bossEnemy();
    wave++;
  }

  makeVisible(){
    divStyle = {
      ...divStyle,
      visibility: 'visible',
      opacity: 1,
    }
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
      if(!this.state.gameover){
        this.animate();
      }
    });
    this.state.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.state.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.state.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i = 0; i < this.state.enemyArray.length; i++){
      this.state.enemyArray[i].update();
      if(this.state.enemyArray[i].state.x <= 0){
        this.state.enemyArray.splice(i,1);
        life--;
        this.adjustLifeDisplay();
        if(life <= 0)
          this.state.gameover = true;
      }
    }

    if(this.state.enemyArray.length == 0 && !roundStarted){
      roundStartTime = score + 500;
      roundStarted = true;
    }

    if(roundStartTime > score){
      this.waveBanner(roundStartTime - score);
    }
    if(roundStartTime === score){
      this.newWave();
      roundStarted = false;
    }

    // Score
    this.state.ctx.fillStyle = "white";
    this.state.ctx.font = "20px verdana";
    this.state.ctx.fillText("Score: " + score, 10, 80);
    score++;

    this.state.ctx.fillText("Kills: " + kills, 180, 80);

    // Life Display
    this.state.ctx.fillStyle = "lightgreen";
    this.state.ctx.font = "20px courier";
    this.state.ctx.fillText(lifeDisplay, 10, 100);

    // gameover screen
    if(this.state.gameover){
      this.state.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.state.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      this.state.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      this.state.ctx.font = "100px verdana";
      this.state.ctx.fillText("Game Over", ((window.innerWidth/2) - 285), window.innerHeight/2);
      this.state.ctx.font = "40px verdana";
      this.state.ctx.fillText("Click to Restart", ((window.innerWidth/2) - 150), ((window.innerHeight/2) + 50));
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

export default BallCanvas;
