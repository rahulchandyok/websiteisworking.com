import React, { Component } from 'react';
import './header.scss';
import Logo from '../../../images/logo 2.png';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  _goHome = () => {
    this.props.history.push({
      pathname: '/'
    });
  };
  _onAboutClick = () => {
    this.props.history.push({
      pathname: '/about'
    });
  };
  render() {
    return (
      <div
        data-layout='row'
        className='header'
        data-layout-align='space-between'
      >
        <img src={Logo} onClick={this._goHome} />
        <div className='header-buttons-container' data-layout='row'>
          <button className='home header-button' onClick={this._goHome}>
            Home
          </button>
          <button className='about header-button' onClick={this._onAboutClick}>
            About
          </button>

          <a
            className='contact-us header-button'
            href='mailto: contact@websiteisworking.com'
          >
            Contact Us
          </a>

          <button className='report header-button'>Report</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
