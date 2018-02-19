import React, {Component} from "react";
import classNames from "classnames";

class Canvas extends Component {
  getClassName() {
    return classNames("Canvas")
  }

  // If canvas mounts
  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d")

    // rectangle
    c.fillStyle = 'rgba(255,0,0,0.5)'
    c.fillRect(50, 50, 50, 50)
    c.fillStyle = 'rgba(255,200,100,0.5)'
    c.fillRect(800, 200, 100, 100)
    c.fillStyle = 'rgba(255,0,0,0.5)'
    c.fillRect(200, 100, 70, 10)

    // line
    c.beginPath()
    c.moveTo(50, 300)
    c.lineTo(300, 400)
    c.lineTo(800, 200)
    c.strokeStyle = '#fa34a3'
    c.stroke()

    // arc / circle
    c.beginPath()
    c.arc(300,300,30,0, Math.PI * 2, false)
    c.strokeStyle = 'blue'
    c.stroke()
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <canvas ref="canvas" id={this.getClassName() + "_canvas"} className={this.getClassName() + "_canvas"} />
      </div>
    )
  }
}

export default Canvas;
