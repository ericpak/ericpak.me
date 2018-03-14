import React, { Component } from 'react';

// Nav and footer height
const navFooterHeight = 44;

class HomePage extends Component {
  componentDidMount(){
    var paintCanvas = document.getElementsByClassName("PaintCanvas")[0].style;
    paintCanvas.top = 0;
    paintCanvas.bottom = 0;

    var ballCanvas = document.getElementsByClassName("BallCanvas")[0].style;
    ballCanvas.top = 0;
    ballCanvas.bottom = 0;

    var toolbar = document.getElementsByClassName("toolbar")[0].style;
    toolbar.top = '10px';
    toolbar.bottom = 0;

    var header = document.getElementsByClassName("Header")[0].style;
    header.position = "relative";
    header.height = (window.innerHeight - navFooterHeight) + "px";

    var footer = document.getElementsByClassName("Footer")[0].style;
    footer.position = "relative";
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default HomePage;
