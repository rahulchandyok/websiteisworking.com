import React, { Component } from 'react';
import './dns.scss';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import working_icon from '../../images/working_icon.png';
import not_working_icon from '../../images/not_working_icon.png';
import Header from '../common/Header/Header';
import Map from '../common/Map/Map';

const types = [
  'A',
  'AAA',
  'CNAME',
  'MX',
  'NS',
  'PTR',
  'SRV',
  'SOA',
  'TXT',
  'CAA'
];

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
    this.state = {
      website: 'google.com',
      dnsType: 'CNAME'
    };
  }
  componentDidMount() {
    // this.props.fetchDnsRecords('CNAME', 'google.com');
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  ping = () => {
    this.props.fetchDnsRecords(this.state.dnsType, this.state.website);
  };

  render() {
    console.log(this.props);
    let resultList = {};
    const { dnsRecords, isDnsRecordsFetched } = this.props.dns;
    dnsRecords.forEach(record => {
      if (record) {
        let key = `lat${record.latitude}-long${record.longitude}`;
        if (record.status == 'active')
          resultList[key] = { name: record.name, active: true };
        else if (record.status == 'closed')
          resultList[key] = { name: record.name, active: false };
        else resultList[key] = { name: record.name, active: undefined };
      }
    });
    const { dnsType } = this.state;
    return (
      <div className='parent-container dns-home'>
        {!isDnsRecordsFetched ? <div className='loader'></div> : ''}
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
                  <label> Check DNS record </label>
                  <label> entries propagation</label>
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
                  <Select
                    id='standard-select-currency'
                    select
                    onChange={this.handleChange('dnsType')}
                    value={dnsType}
                    className='custom-select'
                    classes={{
                      root: 'bst-mui-select',
                      select: 'bst-mui-select-select'
                    }}
                    MenuProps={{
                      MenuListProps: {
                        classes: {
                          root: 'bst-mui-menu-list'
                        }
                      },
                      BackdropProps: {
                        invisible: false
                      }
                    }}
                    label='Select'
                    margin='normal'
                  >
                    {types.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <button
                    type='submit'
                    class='button is-link is-medium ping-button'
                    onClick={this.ping}
                  >
                    ping!
                  </button>
                </div>
                {resultList && Object.keys(resultList).length !== 0 ? (
                  <Map resultList={resultList} />
                ) : (
                  ''
                )}
              </div>
              {/* {this.state.dns && this.props.dns.dnsRecords && (
                <div className='ping-loader'>
                  <CircularProgress size={'100px'} />
                </div>
              )} */}
            </div>

            {dnsRecords && (
              <div className='history dns-results'>
                <ul>
                  {dnsRecords.map(record => (
                    <li className='record-list-item'>
                      <div className='name-status'>
                        <span className='record-name'>
                          {record && record.name}
                        </span>
                        <span className='record-status'>
                          {record && record.status === 'active' ? (
                            <img
                              alt='icon'
                              className='icon working'
                              src={working_icon}
                            />
                          ) : record && record.status === 'closed' ? (
                            <img
                              alt='icon'
                              className='icon not-working'
                              src={not_working_icon}
                            />
                          ) : (
                            ''
                          )}
                        </span>
                      </div>

                      <div className='record-info'>{record && record.ips}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}
export default Dns;
