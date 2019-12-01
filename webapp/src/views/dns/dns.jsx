import React, { Fragment as F, Component } from "react";
import "./dns.scss";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import working_icon from "../../images/tick_circled.png";
import not_working_icon from "../../images/not_working_icon.png";
import Header from "../common/Header/Header";
import Map from "../common/Map/Map";

const ColorCircularProgress = withStyles({
  root: {
    color: "#fff"
  }
})(CircularProgress);

const types = [
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "NS",
  "PTR",
  "SRV",
  "SOA",
  "TXT",
  "CAA"
];

const DnsHeader = props => {
  const { dnsRecords, dnsType, website } = props;
  return (
    <div className="dns-header-container">
      <label className="ping-input-label">
        {" "}
        Check DNS record entries propagation
      </label>
      <div
        className="ping-container"
        data-layout="row"
        data-layout-align="start end"
      >
        <div className="input-container">
          <TextField
            id="standard-name"
            className="textfield"
            value={website}
            onChange={props.handleChange("website")}
            fullWidth
            margin="normal"
            placeholder="google.com"
            autoComplete="off"
          />
        </div>
        <div className="button-container">
          <Select
            id="standard-select-currency"
            select
            onChange={props.handleChange("dnsType")}
            value={dnsType}
            className="custom-select"
            classes={{
              root: "bst-mui-select",
              select: "bst-mui-select-select"
            }}
            MenuProps={{
              MenuListProps: {
                classes: {
                  root: "bst-mui-menu-list"
                }
              },
              BackdropProps: {
                invisible: false
              }
            }}
            label="Select"
          >
            {types.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <button
            type="submit"
            className="button is-link is-medium ping-button"
            onClick={props.ping}
          >
            ping!
          </button>
          {/* {!isDnsRecordsFetched ? (
    <div className='ping-loader'>
      <CircularProgress size={'40px'} />
    </div>
  ) : (
    ''
  )} */}
        </div>
      </div>
    </div>
  );
};
class Dns extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    let { website } = (props.location && props.location.state) || {};
    this.state = {
      website: website || "",
      dnsType: "A"
    };
  }
  componentDidMount() {
    // this.props.fetchDnsRecords('CNAME', 'google.com');
  }
  componentWillUnmount = () => {
    this.props.clearDnsData();
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  ping = () => {
    this.props.fetchDnsRecords(this.state.dnsType, this.state.website);
  };

  render() {
    console.log(this.props);
    const { dnsRecords, isDnsRecordsFetched } = this.props.dns;
    const { dnsType } = this.state;
    return (
      <F>
        {this.props.isNav ? (
          <DnsHeader
            {...this.props.dns}
            dnsType={dnsType}
            website={this.state.website}
            handleChange={this.handleChange}
            ping={this.ping}
          />
        ) : (
          <div className="parent-container dns-home">
            <main data-layout="column">
              <div className="dns-content">
                {dnsRecords && (
                  <div className="history dns-results">
                    <ul>
                      {Object.keys(dnsRecords).map((key, index) => (
                        <li className="record-list-item" key={index}>
                          <div className="name-status">
                            <span className="record-name">
                              {dnsRecords[key] && dnsRecords[key].name}
                            </span>
                            <span className="record-status">
                              {isDnsRecordsFetched &&
                              dnsRecords[key] &&
                              dnsRecords[key].active === true ? (
                                <img
                                  alt="icon"
                                  className="icon working"
                                  src={working_icon}
                                />
                              ) : isDnsRecordsFetched &&
                                dnsRecords[key] &&
                                dnsRecords[key].active === false ? (
                                <img
                                  alt="icon"
                                  className="icon not-working"
                                  src={not_working_icon}
                                />
                              ) : (
                                ""
                              )}
                              {!isDnsRecordsFetched ? (
                                <div className="ping-loader">
                                  <ColorCircularProgress size={15} />
                                </div>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>

                          <div className="record-info">
                            {dnsRecords[key].ips &&
                            dnsRecords[key].ips.length > 0 ? (
                              <ul className="ip-list">
                                {dnsRecords[key].ips.map((ipText, index) => {
                                  return (
                                    <li>
                                      <span>{ipText}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </main>
          </div>
        )}
      </F>
    );
  }
}
export default Dns;
