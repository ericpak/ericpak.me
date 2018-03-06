import React, { Component } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { SketchPicker, ChromePicker } from 'react-color';

// components
import BallCanvas from './canvas/ballCanvas';
import PaintCanvas from './canvas/paintCanvas';

var toolbarDivStyle = {
  top: 10,
  bottom: 0,
}

var footerHeight = 44;
var slider = document.getElementsByClassName("brushSize");

class Header extends Component {
  getClassName() {
    return ClassNames("Header");
  }

  constructor(){
    super();
    this.state = {
      showPaintCanvas: true,
      home: "▾Home",
      paintCanvasBrush: {
        color: '#FFBC67',
        size: 10,
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

  handleSizeChange(){
    this.setBrushSize(this.refs.brushSize.value);
  }

  setBrushSize(number){
    if(isFinite(String(number))){
      if(number >= 1 && number <= 100){
        console.log(this.state.paintCanvasBrush);
        this.setState({ paintCanvasBrush:
          { size: number, color: this.state.paintCanvasBrush.color, }
        });
      }
    }
  }

  handleColorChange(color){
    this.setState({ paintCanvasBrush:
      {...this.state.paintCanvasBrush, color: color.hex}
    });
    console.log(this.state.paintCanvasBrush);
  }

  render() {
    return (
      <header style={this.state.headerStyle} className={this.getClassName()}>
        {this.state.showPaintCanvas ?
          (<PaintCanvas style={this.state.paintCanvasBrush} ref={ref => (this._paintCanvas = ref)} />) :
          (<BallCanvas ref={ref => (this._ballCanvas = ref)} />)
        }
        <nav className="NavBar">
          <ul style={toolbarDivStyle} className="toolbar">
            <li class="toolbarParent"><a>+</a></li>
            <ul class="toolbarChild">
              <li className="brushSizeLabel">Brush Size: {this.state.paintCanvasBrush.size}</li>
              <li className="brushSizeLi">
                <input
                  ref="brushSize"
                  className="brushSize"
                  type="range"
                  name="number"
                  value={this.state.paintCanvasBrush.size}
                  min="1"
                  max="100"
                  onChange={this.handleSizeChange.bind(this)}
                  oninput={this.handleSizeChange.bind(this)}
                />
              </li>
              <li>
                <ChromePicker
                  color={this.state.paintCanvasBrush.color}
                  onChangeComplete={this.handleColorChange.bind(this)}
                />
              </li>
                <li className="resetButton"><button onClick={this.reset.bind(this)}>Reset</button></li>
                <li className="switchCanvasButton"><button onClick={this.switchCanvas.bind(this)}>Switch Canvas</button></li>
            </ul>
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
