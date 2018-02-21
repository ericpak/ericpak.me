import React, { Component } from "react";
import ClassNames from "classnames";
import github from "../../Assets/media/images/github.svg"
import linkedin from "../../Assets/media/images/linkedin.svg"
import facebook from "../../Assets/media/images/facebook.svg"
import email from "../../Assets/media/images/email.svg"

const links = [
  {icon: github, alt: "GitHub", url: "https://github.com/ericpak"},
  {icon: linkedin, alt: "LinkedIn", url: "https://www.linkedin.com/in/eric-pak/"},
  //{icon: facebook, alt: "Facebook", url: "https://www.facebook.com/PakIndustries"},
  {icon: email, alt: "Email", url: "mailto:pak.eric@gmail.com"},
]

class Footer extends Component {
  getClassName() {
    return ClassNames("Footer");
  }

  renderLink(link){
    return <a className="Footer_link" href={link.url} title={link.alt}> <img src={link.icon} /> </a>;
  }

  render() {
    return (
      <footer className={this.getClassName()}>
        <div className={this.getClassName() + "_copyright"}>
          © 2018 Eric Pak - code on <a href="https://github.com/ericpak/ericpak.me">gitHub</a>
        </div>
        <div className={this.getClassName() + "_links"}>
          {links.map(this.renderLink)}
        </div>
      </footer>
    );
  }
}

export default Footer;
