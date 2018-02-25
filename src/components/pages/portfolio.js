import React, {Component} from "react"
import classNames from "classnames"
import {projects} from "./projectList"

class Portfolio extends Component {
  getClassName() {
    return classNames("Portfolio")
  }

  renderItem(item, idx) {
    return <div className="Portfolio__item" key={idx}>
      <h2>{item.title}</h2>
      <div className="Portfolio__item__description">
        <div className="Portfolio__item__tools">
          <h6>Tools Used</h6>
          {item.description}
        </div>
        {item.description}
        {!!item.link && <a href={item.link} className="Portfolio__item__link btn">Check it out ></a>}
      </div>
      <div className="Portfolio__item__images">
        {item.images    && item.images.map(this.renderImage)}
        {item.component && this.renderComponent(item.component)}
      </div>
    </div>
  }

  renderImage(image, idx) {
    return <div className="Portfolio__item__image" key={idx}>
      <div className="Portfolio__item__image__content" style={{backgroundImage: `url(${image})`}} />
    </div>
  }

  renderComponent(component) {
    let Component = component
    return <div className="Portfolio__item__image">
      <Component />
    </div>
  }

  renderTool(tool, idx) {
    return <div className="Portfolio__item__tool" key={idx}>
      <div className="pill">{tool}</div>
    </div>
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <h2>Projects</h2>
        {projects.map(this.renderItem)}
      </div>
    )
  }
}

export default Portfolio
