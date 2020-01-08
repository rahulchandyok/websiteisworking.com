import React, { Fragment as F, Component } from "react";
import "./home.scss";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";
import Header from "../common/Header/Header";
import WorkingTick from "../../images/tick_circled.png";
import CrossIcon from "../../images/cross.png";
import { PATHS } from "../../App/Constants";

const HomeHeader = props => {
  const { website, ping, handleChange, home } = props;
  return (
    <div className="home-header-container card">
      <div className="ping-input-label" data-layout="column">
        <label> Check if your website is working</label>
      </div>

      <div className="input-container">
        <TextField
          placeholder="google.com"
          id="standard-name"
          className="textfield"
          value={website}
          onChange={handleChange("website")}
          margin="normal"
          fullWidth
        />
      </div>
      <div className="home-button-container">
        <button
          type="submit"
          className="custom-button is-link is-medium ping-button"
          onClick={ping}
        >
          ping!
        </button>
      </div>

      {website && (
        <div
          className={
            "response-container" + (home.pingWebsiteLoader ? " hide" : "")
          }
          data-layout="column"
        >
          <div className="result-container">
            {home.pingResponse.errorCode === 1 && (
              <div className="error-container">
                <label id="website-error">Uh oh! There was an error.</label>
                <br />
                <label className="white-cls">
                  It doesn't look like you entered a valid domain or service
                  name.
                </label>
              </div>
            )}
            {home.pingResponse.errorCode === 0 && (
              <label data-layout="row" data-layout-align="start center">
                <span className="url">{home.pingResponse.website}</span>
                {home.pingResponse.working === true && (
                  <span
                    data-layout="row"
                    data-layout-align="start center"
                    className="website-working"
                  >
                    is working
                    <img src={WorkingTick} alt="working" />
                  </span>
                )}
                {home.pingResponse.working === false && (
                  <span
                    data-layout="row"
                    data-layout-align="start center"
                    className="website-not-working"
                  >
                    <span> is not working</span>
                    <img src={CrossIcon} alt="working" />
                  </span>
                )}
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      website: ""
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.fetchRecentSearches();
  }
  componentWillUnmount = () => {
    this.props.resetPingResponse();
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    if (Object.keys(this.props.home.pingResponse).length) {
      this.props.resetPingResponse();
    }
  };
  ping = () => {
    this.props.pingWebsite(this.state.website);
  };
  checkDdns = () => {
    this.props.history.push({
      pathname: PATHS.DNS,
      state: { website: this.state.website }
    });
  };

  render() {
    let { isMobile } = this.props;
    return (
      <div className="parent-container ">
        {this.props.isNav ? (
          <HomeHeader
            home={this.props.home}
            website={this.state.website}
            ping={this.ping}
            handleChange={this.handleChange}
          />
        ) : (
          <div className="home-content">
            <main data-layout="row">
              {!isMobile ? (
                <HomeHeader
                  home={this.props.home}
                  website={this.state.website}
                  ping={this.ping}
                  handleChange={this.handleChange}
                />
              ) : (
                ""
              )}
              <div className="side-content">
                <div className="relative">
                  <div className="history">
                    <label className="history-label">Recent Searches</label>
                    {this.props.home.recentSearches && (
                      <div className="history-list">
                        <ul>
                          {" "}
                          {this.props.home.recentSearches.map(val => (
                            <li className="" key={val}>
                              {val}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {!isMobile ? (
                    <div className="home-details">
                      <div
                        className="check-dns-button"
                        onClick={this.checkDdns}
                      >
                        <span>Check Dns records</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Home);
