import React from 'react';

export default class Canvas extends React.Component {
  componentWillMount() {
    this.setState({
      canvasSize: { canvasWidth: "50vh", canvasHeight: "50vw" }
    })
  }

  componentDidMount() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;

  }

  render() {
    return (
      <div>
        <canvas ref={canvasHex => this.canvasHex = canvasHex }> </canvas>
      </div>
    )
  }
}
