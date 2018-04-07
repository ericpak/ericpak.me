import Square from "./square";

// Wave Banner DisplayTime
const waveBannerDisplayTime = 300;

class gameoverScreen {
    static gameover(ctx, canvas, kills, wave, startSquare, activatedPerks, activatedSkills){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(204, 204, 204, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    startSquare = new Square(ctx, ((canvas.width/2) - 80), (canvas.height - 60), 160, 50, 0, 0, 1, 1, 'rgba(255, 255, 255, 0.5)');
    startSquare.update();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.font = "100px verdana";
    ctx.fillText("Game Over", ((canvas.width/2) - 288), 80);
    ctx.font = "40px verdana";
    ctx.fillText("Kills", ((canvas.width/2) - 45), 150);

    ctx.fillStyle = 'blue';
    ctx.fillRect(canvas.width/5-20,canvas.height/5+30,40,40);
    ctx.fillStyle = 'green';
    ctx.fillRect(2*canvas.width/5-30,canvas.height/5+20,60,60);
    ctx.fillStyle = 'purple';
    ctx.fillRect(3*canvas.width/5-20,canvas.height/5+30,40,40);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(4*canvas.width/5-10,canvas.height/5+40,20,20);

    ctx.fillStyle = 'grey';
    ctx.fillRect(canvas.width/5-40,2*canvas.height/5+10,80,80);
    ctx.fillStyle = 'orange';
    ctx.fillRect(2*canvas.width/5-20,2*canvas.height/5+30,40,40);
    ctx.fillStyle = 'white';
    ctx.fillRect(3*canvas.width/5-20,2*canvas.height/5+30,40,40);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(4*canvas.width/5-20,2*canvas.height/5+30,40,40);

    ctx.fillStyle = 'black';
    ctx.font = '30px courier';
    if(kills.blue.toString().length < 10)
      ctx.fillText(kills.blue,canvas.width/5-8,canvas.height/5+120);
    else if(kills.blue.toString().length < 100)
      ctx.fillText(kills.blue,canvas.width/5-18,canvas.height/5+120);
    else
      ctx.fillText(kills.blue,canvas.width/5-27,canvas.height/5+120);

    if(kills.green.toString().length < 10)
      ctx.fillText(kills.green,2*canvas.width/5-8,canvas.height/5+120);
    else if(kills.green.toString().length < 100)
      ctx.fillText(kills.green,2*canvas.width/5-18,canvas.height/5+120);
    else
      ctx.fillText(kills.green,2*canvas.width/5-27,canvas.height/5+120);

    if(kills.purple.toString().length < 10)
      ctx.fillText(kills.purple,3*canvas.width/5-8,canvas.height/5+120);
    else if(kills.purple.toString().length < 100)
      ctx.fillText(kills.purple,3*canvas.width/5-18,canvas.height/5+120);
    else
      ctx.fillText(kills.purple,3*canvas.width/5-27,canvas.height/5+120);

    if(kills.yellow.toString().length < 10)
      ctx.fillText(kills.yellow,4*canvas.width/5-8,canvas.height/5+120);
    else if(kills.yellow.toString().length < 100)
      ctx.fillText(kills.yellow,4*canvas.width/5-18,canvas.height/5+120);
    else
      ctx.fillText(kills.yellow,4*canvas.width/5-27,canvas.height/5+120);

    if(kills.grey.toString().length < 10)
      ctx.fillText(kills.grey,canvas.width/5-8,2*canvas.height/5+120);
    else if(kills.grey.toString().length < 100)
      ctx.fillText(kills.grey,canvas.width/5-18,2*canvas.height/5+120);
    else
      ctx.fillText(kills.grey,canvas.width/5-27,2*canvas.height/5+120);

    if(kills.orange.toString().length < 10)
      ctx.fillText(kills.orange,2*canvas.width/5-8,2*canvas.height/5+120);
    else if(kills.orange.toString().length < 100)
      ctx.fillText(kills.orange,2*canvas.width/5-18,2*canvas.height/5+120);
    else
      ctx.fillText(kills.orange,2*canvas.width/5-27,2*canvas.height/5+120);

    if(kills.white.toString().length < 10)
      ctx.fillText(kills.white,3*canvas.width/5-8,2*canvas.height/5+120);
    else if(kills.white.toString().length < 100)
      ctx.fillText(kills.white,3*canvas.width/5-18,2*canvas.height/5+120);
    else
      ctx.fillText(kills.white,3*canvas.width/5-27,2*canvas.height/5+120);

    if(kills.black.toString().length < 10)
      ctx.fillText(kills.black,4*canvas.width/5-8,2*canvas.height/5+120);
    else if(kills.black.toString().length < 100)
      ctx.fillText(kills.black,4*canvas.width/5-18,2*canvas.height/5+120);
    else
      ctx.fillText(kills.black,4*canvas.width/5-27,2*canvas.height/5+120);

    if(kills.boss.toString().length < 10)
      ctx.fillText(kills.boss,canvas.width/5-8,3*canvas.height/5+120);
    else if(kills.boss.toString().length < 100)
      ctx.fillText(kills.boss,canvas.width/5-18,3*canvas.height/5+120);
    else
      ctx.fillText(kills.boss,canvas.width/5-27,3*canvas.height/5+120);

    var killScore = 0;
    killScore += kills.blue*1;
    killScore += kills.green*2;
    killScore += kills.purple*3;
    killScore += kills.yellow*2;
    killScore += kills.grey*5;
    killScore += kills.orange*2;
    killScore += kills.white*2;
    killScore += kills.black*3;
    killScore += kills.boss*250;

    var waveScore = (wave-2)*100;
    var totalScore = killScore + waveScore;

    ctx.font = "30px verdana";
    ctx.fillText("Kill Score: " + killScore, ((canvas.width/2) - 130), 2*canvas.height/3);
    ctx.fillText("Wave Score: " + waveScore, ((canvas.width/2) - 159), 2*canvas.height/3+50);

    ctx.font = "35px verdana";
    ctx.fillStyle = 'rgb(62,96,111)';
    ctx.fillText("Total Score: " + totalScore, ((canvas.width/2) - 182), 2*canvas.height/3+120);

    ctx.fillStyle = 'black';
    // Grid Lines
    // ctx.fillRect(2*canvas.width/10,0,1,1000);
    // ctx.fillRect(4*canvas.width/10,0,1,1000);
    // ctx.fillRect(6*canvas.width/10,0,1,1000);
    // ctx.fillRect(8*canvas.width/10,0,1,1000);
    //
    // ctx.fillRect(0,canvas.height/5+100,1600,1);
    // ctx.fillRect(0,2*canvas.height/5+100,1600,1);

    ctx.font = '40px verdana';
    ctx.fillText("Restart", ((canvas.width/2) - 78), (canvas.height - 21));


    // Activated Perks
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    var yadjust = 0;
    var perkValues = Object.values(activatedPerks);
    var perkKeys = Object.keys(activatedPerks);
    if(perkValues.length > 0)
      ctx.fillText("Activated Perks", 20, 120);
    for(var i = 0; i < perkValues.length; i++){
      yadjust += 20;
      ctx.fillText(perkKeys[i]+": ", 20, 140+yadjust);
      ctx.fillText(perkValues[i], 120, 140+yadjust);
    }

    // Activated Skills
    var skillValues = Object.values(activatedSkills);
    var skillKeys = Object.keys(activatedSkills);
    if(skillValues.length > 0){
      yadjust += 40;
      ctx.fillText("Activated Skills", 20, 160+yadjust);
      yadjust += 40;
    }
    for(i = 0; i < skillValues.length; i++){
      yadjust += 20;
      ctx.fillText(skillKeys[i]+": ", 20, 140+yadjust);
      ctx.fillText(skillValues[i], 120, 140+yadjust);
    }

    return startSquare;
  }

  static startScreen(ctx, canvas, startSquare){
    // Grid Lines
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    // ctx.fillRect(1*canvas.width/15,0,1,1000);
    // ctx.fillRect(2*canvas.width/15,0,1,1000);
    // ctx.fillRect(3*canvas.width/15,0,1,1000);
    // ctx.fillRect(4*canvas.width/15,0,1,1000);
    // ctx.fillRect(5*canvas.width/15,0,1,1000);
    // ctx.fillRect(6*canvas.width/15,0,1,1000);
    // ctx.fillRect(7*canvas.width/15,0,1,1000);
    // ctx.fillRect(8*canvas.width/15,0,1,1000);
    // ctx.fillRect(9*canvas.width/15,0,1,1000);
    // ctx.fillRect(10*canvas.width/15,0,1,1000);
    // ctx.fillRect(11*canvas.width/15,0,1,1000);
    // ctx.fillRect(12*canvas.width/15,0,1,1000);
    // ctx.fillRect(13*canvas.width/15,0,1,1000);
    // ctx.fillRect(14*canvas.width/15,0,1,1000);
    // ctx.fillRect(15*canvas.width/15,0,1,1000);
    //
    // ctx.fillRect(0,1*canvas.height/15,1600,1);
    // ctx.fillRect(0,2*canvas.height/15,1600,1);
    // ctx.fillRect(0,3*canvas.height/15,1600,1);
    // ctx.fillRect(0,4*canvas.height/15,1600,1);
    // ctx.fillRect(0,5*canvas.height/15,1600,1);
    // ctx.fillRect(0,6*canvas.height/15,1600,1);
    // ctx.fillRect(0,7*canvas.height/15,1600,1);
    // ctx.fillRect(0,8*canvas.height/15,1600,1);
    // ctx.fillRect(0,9*canvas.height/15,1600,1);
    // ctx.fillRect(0,10*canvas.height/15,1600,1);
    // ctx.fillRect(0,11*canvas.height/15,1600,1);
    // ctx.fillRect(0,12*canvas.height/15,1600,1);
    // ctx.fillRect(0,13*canvas.height/15,1600,1);
    // ctx.fillRect(0,14*canvas.height/15,1600,1);
    // ctx.fillRect(0,15*canvas.height/15,1600,1);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    startSquare = new Square(ctx, ((canvas.width/2) - 75), ((canvas.height/2) + 50), 150, 50, 0, 0, 1, 1, 'rgba(255, 255, 255, 0.5)');
    startSquare.update();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.font = "40px verdana";
    ctx.fillText("Beta Version 0.1.0", ((canvas.width/2) - 180), canvas.height/2 - 140);
    ctx.fillText("Click the squares to kill them", ((canvas.width/2) - 300), canvas.height/2);
    ctx.fillText("Protect the left side", ((canvas.width/2) - 205), canvas.height/2 + 40);
    ctx.fillText("Start", ((canvas.width/2) - 55), ((canvas.height/2) + 90));
    return startSquare;
  }

  // Display Wave Banner
  static waveBanner(ctx, canvas, wave, time){
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
    if(wave === 10)
      ctx.fillText("Boss Wave", ((canvas.width/2) - 50), canvas.height/2);
    else
      ctx.fillText("Wave " + wave, ((canvas.width/2)), canvas.height/2);
  }
}

export default gameoverScreen;
