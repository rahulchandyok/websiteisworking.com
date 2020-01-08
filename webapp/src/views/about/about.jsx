import React, { Fragment as F, Component } from "react";
import "./about.scss";
import { withRouter } from "react-router-dom";
import Header from "../common/Header/Header";

const AboutHeader = props => (
  <div className={`about ${props.isMobile ? "card" : ""}`}>
    <div class="privacy-container">
      <p>
        Eagertools has been founded in the year 2019 considering the prevailing
        website issues faced by millions of technology professionals everyday.
        It is a one-stop solution to check if your website is actually working
        or not. It provides free, fast & accurate network diagostics &
        operations support globally.
        {/* For
    us, our users is of utmost importance. */}
      </p>
      {/* <p>
Innovation is why we come to work every day. Almost all of our
online tools started as internal projects that we found useful and
decided to share with the community. As the site has grown, we
continue to invest heavily to develop new tools and services.
</p> */}
    </div>
  </div>
);
class About extends Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    let { isMobile } = this.props;
    return (
      <div className="parent-container">
        {" "}
        {this.props.isNav ? (
          <AboutHeader isMobile={isMobile} />
        ) : (
          <p className=" about-content">
            {!isMobile ? <AboutHeader isMobile={isMobile} /> : ""}
            If you have an idea for a new tool, service, or any feedback, we'd
            really love to hear about it. contact@eagertools.com
          </p>
        )}
      </div>
    );
  }
}
export default withRouter(About);
