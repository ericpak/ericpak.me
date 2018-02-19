import React, { Component } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';

class Nav extends Component {
  getClassName() {
    return ClassNames("Nav")
  }

  render() {
    return (
        <nav className={this.getClassName()}>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to="/Products">Products</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>
    );
  }
}

export default Nav;
