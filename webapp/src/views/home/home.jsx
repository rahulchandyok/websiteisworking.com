import React, { Component } from 'react';
import './home.css';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import Logo from '../../images/logo 2.png'
import WorkingTick from '../../images/tick.png'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      website: 'google.com'
    };
  }
  componentWillMount() {
    this.props.fetchRecentSearches();
  }

  handleChange = name => event => {
    this.props.resetPingResponse();
    this.setState({ [name]: event.target.value });
  };
  ping = () => {
    this.props.pingWebsite(this.state.website);
  };

  render() {
    console.log(this.props);
    return (
      <div className='parent-container'>
        <div
          data-layout='row'
          className='header'
          data-layout-align='space-between'
        >
          <img src={Logo} />
          <div className='header-buttons-container' data-layout='row'>
            <button className='home header-button'>Home</button>
            <button className='about header-button'>About</button>
            <button className='contact-us header-button'>Contact Us</button>
            <button className='report header-button'>Report</button>
          </div>
        </div>
        <main data-layout='column'>
          <div className='side-content'>
            <div
              className='main-content'
              flex='60'
              data-layout='column'
              data-layout-align='start'
            >
              <div
                className='ping-container'
                data-layout='row'
                data-layout-align='start end'
              >
                <div className='ping-input-label' data-layout='column'>
                  <label> Check if any </label>
                  <label> website is working</label>
                </div>
                <div className='button-container'>
                  <div className='input-container'>
                    <TextField
                      id='standard-name'
                      className='textfield'
                      value={this.state.website}
                      onChange={this.handleChange('website')}
                      margin='normal'
                      fullWidth
                    />
                  </div>
                  <button
                    type='submit'
                    class='button is-link is-medium ping-button'
                    onClick={this.ping}
                  >
                    ping!
                  </button>
                </div>
              </div>
              {this.state.website && this.props.home.pingWebsiteLoader && (
                <div className='ping-loader'>
                  <CircularProgress size={'100px'} />
                </div>
              )}
              {this.state.website && (
                <div className='response-container' data-layout='column'>
                  <div className='result-container'>
                    {this.props.home.pingResponse.errorCode === 1 && (
                      <div className='error-container'>
                        <label id='website-error'>
                          Uh oh! There was an error.
                        </label>
                        <br />
                        <label class='white-cls'>
                          It doesn't look like you entered a valid domain or
                          service name.
                        </label>
                      </div>
                    )}
                    {this.props.home.pingResponse.errorCode === 0 && (
                      <label data-layout="row" data-layout-align="start center">
                        {this.props.home.pingResponse.website}
                        {this.props.home.pingResponse.working === true && (
                          <span data-layout="row" data-layout-align="start center">&nbsp;is working<img src={WorkingTick} /></span>
                        )}
                        {this.props.home.pingResponse.working === false && (
                          <span> is not working</span>
                        )}
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className='history-container'>
              <div className='history'>
                <label className='history-label'>Popular Searches</label>
                {this.props.home.recentSearches && (
                  <div className='history-list'>
                    <ul>
                      {' '}
                      {this.props.home.recentSearches.map(val => (
                        <li className='' key={val}>
                          {val}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='other-services'>
            <div className='dns-container'>
              <div className='dns-card' data-layout='column'>
                <label className='dns-label'>Check DNS records</label>
                <div className='website-name'>{this.state.website}</div>
              </div>
            </div>
            <div className='full-suite-container'>
              <div className='full-suite-card' data-layout='column'>
                <label className='full-suite-label'>
                  Checkout full suite of services
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default Home;
