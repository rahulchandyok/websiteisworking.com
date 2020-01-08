import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PATHS } from "../../App/Constants.js";
import "./footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  _navigate = path => {
    this.props.history.push({
      pathname: path
    });
  };
  render() {
    return (
      <div className="footer">
        <div className="footer-item" onClick={() => this._navigate("home")}>
          Home
        </div>
        <div
          className="footer-item"
          onClick={() => this._navigate("dns-check")}
        >
          Dns
        </div>
        <div className="footer-item" onClick={() => this._navigate("about-us")}>
          About
        </div>
      </div>
    );
  }
}
export default withRouter(Footer);
