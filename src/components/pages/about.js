import React, { Component } from 'react';

// Nav and footer height
const navFooterHeight = 44;

class About extends Component {
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
    }

  render() {
    return (
      <div className="wrap about">
        <h1>About</h1>
        <p>Hi, my name is Eric Pak! I was born and raised in Alaska. Ever since i was little i have been fascinated by technology. I studied and finished my Computer Science degree at the University of Alaska Anchorage.</p>
      </div>
    );
  }
}

export default About;
