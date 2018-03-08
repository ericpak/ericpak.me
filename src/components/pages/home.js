import React, { Component } from 'react';

// Nav and footer height
const navFooterHeight = 44;

class HomePage extends Component {
  componentDidMount(){
    this.props.isCanvasDown(true);
    console.log("mount home");
    var paintCanvas = document.getElementsByClassName("PaintCanvas")[0].style;
    paintCanvas.top = 0;
    paintCanvas.bottom = 0;
    console.log(paintCanvas);

    var header = document.getElementsByClassName("Header")[0].style;
    header.position = "relative";
    header.height = (window.innerHeight - navFooterHeight) + "px";
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default HomePage;
