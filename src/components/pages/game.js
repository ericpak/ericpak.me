import React, { Component } from 'react';
import CDefense from '../game/cDefense';

// Nav and footer height
const navFooterHeight = 44;

class Game extends Component {
  componentDidMount(){
    var paintCanvas = document.getElementsByClassName("PaintCanvas")[0].style;
    paintCanvas.top = (-window.innerHeight + navFooterHeight) + "px";
    paintCanvas.bottom = (window.innerHeight - navFooterHeight) + "px";

    var ballCanvas = document.getElementsByClassName("BallCanvas")[0].style;
    ballCanvas.top = (-window.innerHeight + navFooterHeight) + "px";
    ballCanvas.bottom = (window.innerHeight - navFooterHeight) + "px";

    var toolbar = document.getElementsByClassName("toolbar")[0].style;
    toolbar.top = "-40px";
    toolbar.bottom = "40px";

    var header = document.getElementsByClassName("Header")[0].style;
    header.position = "absolute";
    header.height = "100vh";

    var footer = document.getElementsByClassName("Footer")[0].style;
    footer.position = "absolute";
    footer.top = '0';

    this._cDefense.makeVisible();
  }

  render() {
    return (
      <div className="game">
        <CDefense ref={ref => (this._cDefense = ref)} />
      </div>
    );
  }
}

export default Game;
