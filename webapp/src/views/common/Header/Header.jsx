import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  goHome = () => {
    this.props.history.push({
      pathname: '/'
    });
  };
  render() {
    return (
      <div
        data-layout='row'
        className='header'
        data-layout-align='space-between'
      >
        <img src='https://websiteisworking.com/favicon.ico' />
        <div className='header-buttons-container' data-layout='row'>
          <button className='home header-button' onClick={this.goHome}>
            Home
          </button>
          <button className='about header-button'>About</button>
          <button className='contact-us header-button'>Contact Us</button>
          <button className='report header-button'>Report</button>
        </div>
      </div>
    );
  }
}

//export default Header;
