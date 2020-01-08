import React, { Component } from "react";
import "./header.scss";
import { Logo } from "../../../App/Constants";
import { withRouter } from "react-router-dom";

class Header extends Component {
  _goHome = () => {
    this.props.history.push({
      pathname: "/"
    });
  };
  _onAboutClick = () => {
    this.props.history.push({
      pathname: "/about-us"
    });
  };
  render() {
    return (
      <div
        data-layout="row"
        className="header"
        data-layout-align="space-between"
      >
        <img src={Logo} alt="logo" onClick={this._goHome} />
        <div className="header-buttons-container" data-layout="row">
          <button className="home header-button" onClick={this._goHome}>
            Home
          </button>
          <button className="about header-button" onClick={this._onAboutClick}>
            About Us
          </button>

          <a
            className="contact-us header-button"
            href="mailto: contact@eagertools.com"
          >
            Contact Us
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
