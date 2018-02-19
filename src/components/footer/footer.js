import React, { Component } from 'react';
import ClassNames from "classnames";

class Footer extends Component {
  getClassName() {
    return ClassNames("Footer")
  }

  render() {
    return (
      <footer>
        <div className={this.getClassName()}>
          © 2018 Eric Pak
        </div>
      </footer>
    );
  }
}

export default Footer;
