import React, { Component } from 'react';
import ClassNames from 'classnames';

// components
import Nav from './nav';
import Canvas from './canvas/canvas';
import MSPaintCanvas from './canvas/paintCanvas';

class Header extends Component {
  getClassName() {
    return ClassNames("Header");
  }

  render() {
    var show = true;
    return (
      <header className={this.getClassName()}>
        {show ?
          (<Canvas />) :
          (<MSPaintCanvas />)
        }
        <Nav />
      </header>
    );
  }
}

export default Header;
