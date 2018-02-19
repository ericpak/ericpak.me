import React, { Component } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';

// components
import Nav from './nav';
import Canvas from './canvas';

class Header extends Component {
  getClassName() {
    return ClassNames("Header")
  }

  render() {
    return (
      <header className={this.getClassName()}>
        <Canvas />
        <Nav />
      </header>
    );
  }
}

export default Header;
