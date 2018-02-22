import React, { Component } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';

// components
import BallCanvas from './canvas/ballCanvas';
import PaintCanvas from './canvas/paintCanvas';

// var showPaintCanvas = true;

class Header extends Component {
  getClassName() {
    return ClassNames("Header");
  }

  constructor(){
    super();
    this.state = {
      showPaintCanvas: true,
    }
  }

  switchCanvas(){
    this.setState({ showPaintCanvas: !this.state.showPaintCanvas});
  }

  reset(){
    if(this.state.showPaintCanvas)
      this._paintCanvas.reset();
    else
      this._ballCanvas.reset();
  }

  render() {
    return (
      <header className={this.getClassName()}>
        {this.state.showPaintCanvas ?
          (<PaintCanvas ref={ref => (this._paintCanvas = ref)} />) :
          (<BallCanvas ref={ref => (this._ballCanvas = ref)} />)
        }
        <nav>
          <ul className="toolbar">
            <li><a onClick={this.reset.bind(this)}>Reset</a></li>
            <li><a onClick={this.switchCanvas.bind(this)}>Switch Canvas</a></li>
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

export default Header;
