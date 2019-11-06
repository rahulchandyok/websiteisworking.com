import React, { Component } from 'react';
import './home.scss';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import Header from '../common/Header/Header';
import WorkingTick from '../../images/tick_circled.png';

class Home extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
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
  checkDdns = () => {
    this.props.history.push({
      pathname: '/dns_check',
      state: { website: this.state.website }
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className='parent-container'>
        <Header />
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
              {this.state.website && this.props.home.pingWebsiteLoader ? (
                <div className='ping-loader'>
                  <CircularProgress size={'40px'} />
                </div>
              ) : (
                ''
              )}

              {this.state.website && (
                <div
                  className={
                    'response-container' +
                    (this.props.home.pingWebsiteLoader ? ' hide' : '')
                  }
                  data-layout='column'
                >
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
                      <label data-layout='row' data-layout-align='start center'>
                        {this.props.home.pingResponse.website}
                        {this.props.home.pingResponse.working === true && (
                          <span
                            data-layout='row'
                            data-layout-align='start center'
                          >
                           is working
                            <img src={WorkingTick} alt='working' />
                          </span>
                        )}
                        {this.props.home.pingResponse.working === false && (
                          <span>&nbsp;is not working</span>
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
            <div className='dns-container' onClick={this.checkDdns}>
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
