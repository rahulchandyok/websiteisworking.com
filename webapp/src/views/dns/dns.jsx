import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './dns.scss';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import working_icon from '../../images/working_icon.png';
import not_working_icon from '../../images/not_working_icon.png';
import { CircularProgress } from '@material-ui/core';
import Header from '../common/Header/Header';
import GoogleMap from '../common/Map/GoogleMap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...(props.onClick ? { onClick: props.onClick } : {})}
  />
);

Marker.defaultProps = {
  onClick: null
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};

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
// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  [
    {
      ips: '',
      ips_with_link: '',
      latitude: '38',
      longitude: '-122',
      name: 'Holtsville NY, United States',
      provider: ' Opendns',
      country: 'us',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '39',
      longitude: '-77',
      name: 'Canoga Park, CA, United States',
      provider: ' Sprint',
      country: 'us',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '41',
      longitude: '-73',
      name: 'Holtsville NY, United States',
      provider: ' Opendns',
      country: 'us',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '37',
      longitude: '-122',
      name: 'Mountain View CA, United States',
      provider: ' Google',
      country: 'us',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '41',
      longitude: '-74',
      name: 'New York, United States',
      provider: 'Columbia University',
      country: 'us',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '44',
      longitude: '-80',
      name: 'Barrie, Canada',
      provider: 'Rogers Comm',
      country: 'ca',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '57',
      longitude: '61',
      name: 'Yekaterinburg, Russian Federation',
      provider: ' Skydns',
      country: 'ru',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '-26',
      longitude: '29',
      name: 'Cullinan, South Africa',
      provider: 'Liquid Telecommunications Ltd',
      country: 'za',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '53',
      longitude: '6',
      name: 'Dalfsen, Netherlands',
      provider: 'Plinq Bv',
      country: 'nl',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '49',
      longitude: '2',
      name: 'Argenteuil, France',
      provider: 'Renater',
      country: 'fr',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '40',
      longitude: '-4',
      name: 'Madrid, Spain',
      provider: 'Telefonica de Espana',
      country: 'es',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '47',
      longitude: '10',
      name: 'Zizers, Switzerland',
      provider: 'Oskar Emmenegger',
      country: 'ch',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '47',
      longitude: '10',
      name: 'Schwarzach, Austria',
      provider: 'Russmedia IT GmbH',
      country: 'at',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '52',
      longitude: '-2',
      name: 'Gloucester, United Kingdom',
      provider: 'Fasthosts Internet',
      country: 'gb',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '56',
      longitude: '10',
      name: 'Midtjylland, Denmark',
      provider: ' NM NET APS',
      country: 'dk',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '51',
      longitude: '7',
      name: 'Oberhausen, Germany',
      provider: 'Deutsche Telekom AG',
      country: 'de',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '26',
      longitude: '-100',
      name: 'Monterrey, Mexico',
      provider: 'Marcatel Com',
      country: 'mx',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '-23',
      longitude: '-43',
      name: 'Barra da Tijuca, Brazil',
      provider: 'Mundivox LTDA',
      country: 'br',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '3',
      longitude: '102',
      name: 'Subang Jaya, Malaysia',
      provider: 'HeiTech Padu Bhd',
      country: 'my',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '-38',
      longitude: '145',
      name: 'Research, Australia',
      provider: 'Cloudflare Inc',
      country: 'au',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '1',
      longitude: '104',
      name: 'Singapore',
      provider: 'Ntt Singapore Pte',
      country: 'sg',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '23',
      longitude: '114',
      name: 'Shenzhen, China',
      provider: 'Shenzhen Sunrise Technology Co.',
      country: 'cn',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '37',
      longitude: '31',
      name: 'Antalya, Turkey',
      provider: 'Teknet Yazlim',
      country: 'tr',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '28',
      longitude: '75',
      name: 'Udaipur, India',
      provider: 'Net4U Technology',
      country: 'in',
      status: 'closed'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '31',
      longitude: '74',
      name: 'Lahore, Pakistan',
      provider: 'Wateen Telecom',
      country: 'pk',
      status: 'closed'
    }
  ].forEach(place => {
    bounds.extend(new maps.LatLng(place.latitude, place.longitude));
  });
  return bounds;
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
    this.state = {
      website: 'google.com',
      dnsType: 'CNAME'
    };
  }
  componentDidMount() {
    this.props.fetchDnsRecords('CNAME', 'google.com');
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  ping = () => {
    this.props.fetchDnsRecords(this.state.dnsType, this.state.website);
    // this.props.pingWebsite(this.state.website);
  };

  render() {
    console.log(this.props);

    const { dnsRecords, isDnsRecordsFetched } = this.props.dns;
    const { dnsType } = this.state;

    return (
      <div className='parent-container dns-home'>
        {!isDnsRecordsFetched ? <div className='loader'></div> : ''}
        {/* <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMap
            defaultZoom={27}
            defaultCenter={[34.0522, -118.2437]}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              apiIsLoaded(map, maps, dnsRecords)
            }
          >
            {dnsRecords.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.latitude}
                lng={place.longitude}
              />
            ))}
          </GoogleMap>
        </div> */}
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
                          ) : (
                            <img
                              alt='icon'
                              className='icon not-working'
                              src={not_working_icon}
                            />
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
