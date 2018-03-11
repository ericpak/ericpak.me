import React, { Component } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { ChromePicker } from 'react-color';

// components
import BallCanvas from './canvas/ballCanvas';
import PaintCanvas from './canvas/paintCanvas';
// import CDefense from '../game/cDefense';

// = Button Images
import paintBtnImg from '../../Assets/media/images/btnImg/paintBtnImg.png';
import ballBtnImg from '../../Assets/media/images/btnImg/ballBtnImg.png';
import cDefenseBtnImg from '../../Assets/media/images/btnImg/cDefenseBtnImg.png';

// Size of footer in pixels
const footerHeight = 44;

// Style for the canvas currently selected
const selectedCanvas = {
  background: 'rgba(244,67,54,0.5)',
  borderRadius: 5,
}

class Header extends Component {
  getClassName() {
    return ClassNames("Header");
  }

  constructor(){
    super();
    this.state = {
      canvasState: 'paint',
      paintCanvasBrush: {
        rgb: { r: 255, g: 188, b: 103, a: 1 },
        size: 10,
      },
      ballCanvasVar: {
        numberOfBalls: 100,
        maxVelocity: 3,
        maxRadius: 40,
        minRadius: 11,
        stroke: false,
        enlargedRadius: 100,
      },
      headerStyle: {
        height: window.innerHeight - footerHeight,
      },
    }
    window.addEventListener('resize', this.resizeWindow.bind(this));
  }

  resizeWindow(){
    this.setState({ headerStyle: { height: window.innerHeight - footerHeight }});
  }

  switchToPaint(){
    this.setState({ canvasState: 'paint' });
    this._paintCanvas.makeVisible();
    this._ballCanvas.makeHidden();
    // this._cDefense.makeHidden();
  }

  switchToBall(){
    this.setState({ canvasState: 'ball' });
    this._paintCanvas.makeHidden();
    this._ballCanvas.makeVisible();
    // this._cDefense.makeHidden();
  }

  switchToCDefense(){
    // this.setState({ canvasState: 'cDefense' });
    // this._paintCanvas.makeHidden();
    // this._ballCanvas.makeHidden();
    // this._cDefense.makeVisible();
  }

  reset(){
    if(this.state.canvasState === 'paint')
      this._paintCanvas.reset();
    else if(this.state.canvasState === 'ball')
      this._ballCanvas.reset();
    else if(this.state.canvasState === 'cDefense')
      this._cDefense.reset();
  }

  handleSizeChange(){
    this.setBrushSize(this.refs.brushSize.value);
  }

  setBrushSize(number){
    if(isFinite(String(number))){
      if(number >= 1 && number <= 100){
        this.setState({ paintCanvasBrush:
          { size: number, rgb: this.state.paintCanvasBrush.rgb, }
        });
      }
    }
  }

  handleColorChange(color){
    this.setState({ paintCanvasBrush:
      {...this.state.paintCanvasBrush, rgb: color.rgb}
    });
  }

  saveCanvas(){
    this._paintCanvas.saveCanvas();
  }

  handleNumbeBallChange(value){
    this.setState({ ballCanvasVar:
      {...this.state.ballCanvasVar, numberOfBalls: this.refs.numberOfBalls.value}
    });
  }

  handleVelocityChange(value){
    this.setState({ ballCanvasVar:
      {...this.state.ballCanvasVar, maxVelocity: this.refs.maxVelocity.value}
    });
  }

  handleMaxRadiusChange(value){
    this.setState({ ballCanvasVar:
      {...this.state.ballCanvasVar, maxRadius: this.refs.maxRadius.value}
    });
  }

  handleMinRadiusChange(value){
    this.setState({ ballCanvasVar:
      {...this.state.ballCanvasVar, minRadius: this.refs.minRadius.value}
    });
    console.log(this.state.ballCanvasVar.minRadius);
  }

  handleEnlargeChange(value){
    this.setState({ ballCanvasVar:
      {...this.state.ballCanvasVar, enlargedRadius: this.refs.enlargedRadius.value}
    });
  }

  render() {
    return (
      <header style={this.state.headerStyle} className={this.getClassName()}>
        <PaintCanvas style={this.state.paintCanvasBrush} ref={ref => (this._paintCanvas = ref)} />
        <BallCanvas variables={this.state.ballCanvasVar} ref={ref => (this._ballCanvas = ref)} />
        <nav className="NavBar">
          <ul className="toolbar">
            <li className="toolbarParent"><a> + </a></li>
            <ul className="toolbarChild">
              {this.state.canvasState === 'paint' ?
                (<div><li className="brushSizeLabel">Brush Size: {this.state.paintCanvasBrush.size}</li>
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
                    onInput={this.handleSizeChange.bind(this)}
                  />
                </li>
                <li>
                  <ChromePicker
                    color={this.state.paintCanvasBrush.rgb}
                    onChangeComplete={this.handleColorChange.bind(this)}
                  />
                </li>
                <li className="saveButton"><button className="saveBtn" onClick={this.saveCanvas.bind(this)}>Save</button></li></div>) : <div></div>}
                {this.state.canvasState === 'ball' ?
                (<div>
                  <li>Number of Balls</li>
                  <li><input
                    ref="numberOfBalls"
                    className="numberOfBalls"
                    type="number"
                    value={this.state.ballCanvasVar.numberOfBalls}
                    onChange={this.handleNumbeBallChange.bind(this)}
                  /></li>
                  <li>Max Velociy</li>
                  <li><input
                    ref="maxVelocity"
                    className="maxVelocity"
                    type="number"
                    value={this.state.ballCanvasVar.maxVelocity}
                    onChange={this.handleVelocityChange.bind(this)}
                  /></li>
                  <li>Max Radius</li>
                  <li><input
                    ref="maxRadius"
                    className="maxRadius"
                    type="number"
                    value={this.state.ballCanvasVar.maxRadius}
                    onChange={this.handleMaxRadiusChange.bind(this)}
                  /></li>
                  <li>Hover Max Radius</li>
                  <li><input
                    ref="enlargedRadius"
                    className="enlargedRadius"
                    type="number"
                    value={this.state.ballCanvasVar.enlargedRadius}
                    onChange={this.handleEnlargeChange.bind(this)}
                  /></li>
                </div>) : <div></div>
              }
              {this.state.canvasState === 'paint' ? <li className="resetButton"><button className="resetBtn" onClick={this.reset.bind(this)}>Reset</button></li> : <div></div> }
              {this.state.canvasState === 'ball' ? <li className="saveButton"><button className="saveBtn" onClick={this.reset.bind(this)}>Refresh</button></li> : <div></div> }
              {this.state.canvasState === 'cDefense' ? <li className="resetButton"><button className="resetBtn" onClick={this.reset.bind(this)}>Restart</button></li> : <div></div> }
            </ul>
            <li className="toolbarParent"><a> = </a></li>
            <ul className="toolbarChild">
              {this.state.canvasState === 'paint' ? <li style={selectedCanvas}><img className='canvasBtnImg' src={paintBtnImg} alt='paintBtnImg' onClick={this.switchToPaint.bind(this)} /></li> : <li><img className='canvasBtnImg' src={paintBtnImg} alt='paintBtnImg' onClick={this.switchToPaint.bind(this)} /></li>}
              {this.state.canvasState === 'ball' ? <li style={selectedCanvas}><img className='canvasBtnImg' src={ballBtnImg} alt='ballBtnImg' onClick={this.switchToBall.bind(this)} /></li> : <li><img className='canvasBtnImg' src={ballBtnImg} alt='ballBtnImg' onClick={this.switchToBall.bind(this)} /></li>}
              {this.state.canvasState === 'cDefense' ? <li style={selectedCanvas}><Link to="/Game"><img className='canvasBtnImg' src={cDefenseBtnImg} alt='cDefenseBtnImg' onClick={this.switchToCDefense.bind(this)} /></Link></li> : <li><Link to="/Game"><img className='canvasBtnImg' src={cDefenseBtnImg} alt='cDefenseBtnImg' onClick={this.switchToCDefense.bind(this)} /></Link></li>}
          </ul>
          </ul>
          <ul className="Nav_Bar">
            <li><Link to='/'>Home</Link></li>
            <li><Link to="/Projects">Projects</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}
// {this.state.canvasState === 'cDefense' ? <li style={selectedCanvas}><img className='canvasBtnImg' src={cDefenseBtnImg} alt='cDefenseBtnImg' onClick={this.switchToCDefense.bind(this)} /></li> : <li><img className='canvasBtnImg' src={cDefenseBtnImg} alt='cDefenseBtnImg' onClick={this.switchToCDefense.bind(this)} /></li>}
export default Header;
