import React, { Component } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';

// components
import BallCanvas from './canvas/ballCanvas';
import PaintCanvas from './canvas/paintCanvas';

var toolbarDivStyle = {
  top: 10,
  bottom: 0,
}

var footerHeight = 44;

class Header extends Component {
  getClassName() {
    return ClassNames("Header");
  }

  constructor(){
    super();
    this.state = {
      showPaintCanvas: true,
      home: "▾Home",
      style: {
        color: 'yellow',
      },
      headerStyle: {
        height: window.innerHeight - footerHeight,
        position: 'relative',
      },
    }
    window.addEventListener('resize', this.resizeWindow.bind(this));
  }

  resizeWindow(){
    this.setState({ headerStyle: { height: window.innerHeight - footerHeight }});
    if(this.state.home === "▴Home")
      this.canvasUp();
    else
      this.canvasDown();
  }

  canvasUp(){
    this.moveToolbarUp();
    this.setState({ home: "▴Home", headerStyle: { position: 'absolute'} });
    if(this.state.showPaintCanvas)
      this._paintCanvas.moveCanvasUp();
    else
      this._ballCanvas.moveCanvasUp();
  }

  canvasDown(){
    this.moveToolbarDown();
    this.setState({ home: "▾Home", headerStyle: { height: window.innerHeight - footerHeight, position: 'relative'} });
    if(this.state.showPaintCanvas)
      this._paintCanvas.moveCanvasDown();
    else
      this._ballCanvas.moveCanvasDown();
  }

  moveToolbarUp(){
    toolbarDivStyle = {
      top: -40,
      bottom: 40,
    }
  }

  moveToolbarDown(){
    toolbarDivStyle = {
      top: 10,
      bottom: 0,
    }
  }

  switchCanvas(){
    this.setState({ showPaintCanvas: !this.state.showPaintCanvas });
  }

  reset(){
    if(this.state.showPaintCanvas)
      this._paintCanvas.reset();
    else
      this._ballCanvas.reset();
  }

  render() {
    return (
      <header style={this.state.headerStyle} className={this.getClassName()}>
        {this.state.showPaintCanvas ?
          (<PaintCanvas style={this.state.style} ref={ref => (this._paintCanvas = ref)} />) :
          (<BallCanvas ref={ref => (this._ballCanvas = ref)} />)
        }
        <nav className="NavBar">
          <ul style={toolbarDivStyle} className="toolbar">
            <li><a onClick={this.reset.bind(this)}>Reset</a></li>
            <li><a onClick={this.switchCanvas.bind(this)}>Switch Canvas</a></li>
          </ul>
          <ul className="Nav_Bar">
            <li><Link onClick={this.canvasDown.bind(this)} to='/'>{this.state.home}</Link></li>
            <li><Link onClick={this.canvasUp.bind(this)} to="/Projects">Projects</Link></li>
            <li><Link onClick={this.canvasUp.bind(this)} to="/Contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
