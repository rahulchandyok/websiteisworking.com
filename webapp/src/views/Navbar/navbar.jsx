import React, { Fragment as F, Component } from "react";
import "./navbar.scss";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import working_icon from "../../images/tick_circled.png";
import not_working_icon from "../../images/not_working_icon.png";
import Header from "../common/Header/Header";
import Map from "../common/Map/Map";
import Dns from "../dns";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    let path = window.location.pathname;
    if (path === "/dns-check" || path === "/dns-check/") path = 1;
    else if (path === "/about-us" || path === "/about-us/") path = 2;
    else path = 0;
    this.state = {
      initialSlide: path
    };
  }
  _navigateTo = (currentTab, nextTab) => {
    let path;
    console.log({ currentTab, nextTab });
    switch (nextTab) {
      case 0: {
        path = "/";

        break;
      }
      case 1: {
        path = "/dns-check";

        break;
      }
      case 2: {
        path = "/about-us";
      }
    }
    this.props.history.push({
      pathname: path
    });
  };
  render() {
    let _this = this;
    var settings = {
      centerMode: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      mobileFirst: true,
      focusOnSelect: true,
      initialSlide: this.state.initialSlide,

      beforeChange: (currentSlide, nextSlide) =>
        _this._navigateTo(currentSlide, nextSlide)
    };
    return (
      <F>
        <div className="header">eagertool</div>
        <Slider {...settings}>
          <div className="home"></div>
          <div>
            <Dns isNav={true} />
          </div>
          <div>
            <div className="about"></div>
          </div>
        </Slider>
      </F>
    );
  }
}
export default withRouter(Navbar);
