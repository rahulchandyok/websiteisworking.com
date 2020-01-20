import React, { Fragment as F, Component } from 'react'
import './ssl.scss'
import TextField from '@material-ui/core/TextField'
import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
const ColorCircularProgress = withStyles({
  root: {
    color: '#003dcc'
  }
})(CircularProgress)
const SSLHeader = props => {
  console.log(props)
  return (
    <div className='ssl-header-container'>
      <label className='go-input-label'> Check SSL Certification</label>
      <div
        className='ping-container'
        data-layout='column'
        data-layout-align='start end'
      >
        <div className='input-container'>
          <TextField
            id='standard-name'
            className='textfield'
            value={props.domainName}
            onChange={props.handleChange('domainName')}
            fullWidth
            margin='normal'
            placeholder='google.com'
            autoComplete='off'
          />
          {/* <TextField
            id='standard-name'
            className='textfield'
            value={props.port}
            onChange={props.handleChange('port')}
            fullWidth
            margin='normal'
            autoComplete='off'
          /> */}
        </div>
        <div className='button-container'>
          <button
            type='submit'
            className='button is-link is-medium go-button'
            onClick={props.go}
          >
            go
          </button>
        </div>
      </div>
      {!props.isNav &&
        props.sslResponse &&
        Object.keys(props.sslResponse).length > 0 && (
          <div className='basic-info'>
            <label className='heading'>Basic-info</label>
            <div className='basic-info-fields'>
              <label>
                Common Name:&nbsp;
                <span>{props.sslResponse['Common Name:']}</span>
              </label>
              <br />
              <label>
                Issuing CA:&nbsp;<span>{props.sslResponse['Issuing CA:']}</span>
              </label>
              <br />
              <label>
                Organization:&nbsp;
                <span>{props.sslResponse['Organization:']}</span>
              </label>
              <br />
              <label>
                Valid:&nbsp;<span>{props.sslResponse['Valid:']}</span>
              </label>
              <br />
              <label>
                Key Size:&nbsp;<span>{props.sslResponse['Key Size:']}</span>
              </label>
            </div>
          </div>
        )}
    </div>
  )
}

class SSL extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0)
    let { domainName } = (props.location && props.location.state) || {}
    this.state = {
      domainName: domainName || '',
      port: 443,
      basicInfoTabState: props.isMobile ? 'closed' : 'open',
      chainsTabState: props.isMobile ? 'closed' : 'open'
    }
  }

  componentDidMount() {
    let searchParams = window.location.search

    let domainName = searchParams.slice(1)
    if (domainName) {
      this.setState({ domainName: domainName }, () => this.go())
    }
  }
  componentWillUnmount = () => {
    this.props.clearSSLResponse()
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
  go = () => {
    if (this.state.domainName) {
      let newUrl =
        window.location.origin +
        window.location.pathname +
        `?${this.state.domainName}`
      window.history.pushState({ path: newUrl }, '', newUrl)
    }
    this.props.fetchSSLResponse(this.state.domainName, this.state.port)
  }
  handleArrowButton = type => {
    console.log(type)
    if (this.state[type] === 'closed')
      this.setState({ [type]: 'open' }, () => console.log(this.state))
    else this.setState({ [type]: 'closed' })
  }
  render() {
    let { isMobile } = this.props
    const { sslResponse, sslCheckLoader } = this.props.ssl
    console.log(this.props)

    return (
      <F>
        {this.props.isNav ? (
          <SSLHeader
            isNav={this.props.isNav}
            isMobile={isMobile}
            domainName={this.state.domainName}
            port={this.state.port}
            handleChange={this.handleChange}
            go={this.go}
            sslResponse={sslResponse}
          />
        ) : (
          <div className='parent-container ssl-home'>
            <main>
              {sslCheckLoader && (
                <div className='loader'>
                  <ColorCircularProgress size={50} />
                </div>
              )}
              {!isMobile ? (
                <div className={'ssl-left-side'}>
                  {' '}
                  <SSLHeader
                    isNav={this.props.isNav}
                    isMobile={isMobile}
                    domainName={this.state.domainName}
                    port={this.state.port}
                    handleChange={this.handleChange}
                    go={this.go}
                    sslResponse={sslResponse}
                  />
                </div>
              ) : (
                ''
              )}
              <div className='ssl-right-side'>
                {isMobile && (
                  <div className='ssl-containers basic-info'>
                    <div
                      data-layout='row'
                      data-layout-align='space-between center'
                    >
                      <label className='heading'>Basic-info</label>
                      {isMobile &&
                        sslResponse &&
                        Object.keys(sslResponse).length > 0 && (
                          <i
                            class='material-icons'
                            onClick={() =>
                              this.handleArrowButton('basicInfoTabState')
                            }
                          >
                            keyboard_arrow_down
                          </i>
                        )}
                    </div>
                    {this.state.basicInfoTabState === 'open' && (
                      <div className='basic-info-fields'>
                        <label>
                          Common Name: &nbsp;
                          <span>{sslResponse['Common Name:']}</span>
                        </label>
                        <br />
                        <label>
                          Issuing CA:&nbsp;
                          <span>{sslResponse['Issuing CA:']}</span>
                        </label>
                        <br />
                        <label>
                          Organization: &nbsp;
                          <span>{sslResponse['Organization:']}</span>
                        </label>
                        <br />
                        <label>
                          Valid:&nbsp;<span>{sslResponse['Valid:']}</span>
                        </label>
                        <br />
                        <label>
                          Key Size:&nbsp;
                          <span>{sslResponse['Key Size:']}</span>
                        </label>
                      </div>
                    )}
                  </div>
                )}
                <div className='ssl-containers expiry-info'>
                  <label>
                    Expiry in &nbsp;<span>{sslResponse['Expiry']}</span>
                  </label>
                </div>
                <div className='ssl-containers dns-resolution'>
                  <label>
                    DNS Resolution
                    <br />
                    &nbsp;<span>{sslResponse['DnsResolutions']}</span>
                  </label>
                </div>
                <div className='ssl-containers chain'>
                  <div
                    data-layout='row'
                    data-layout-align='space-between center'
                  >
                    <label className='heading'>Chains</label>
                    {isMobile &&
                      sslResponse &&
                      Object.keys(sslResponse).length > 0 && (
                        <i
                          class='material-icons'
                          onClick={() =>
                            this.handleArrowButton('chainsTabState')
                          }
                        >
                          keyboard_arrow_down
                        </i>
                      )}
                  </div>
                  {this.state.chainsTabState === 'open' &&
                    sslResponse['chains'] &&
                    sslResponse['chains'].map(chain => {
                      return Object.keys(chain).length > 0 ? (
                        <div className='chains'>
                          <label>
                            Common Name:&nbsp;
                            <span>{chain['Common Name']}</span>
                          </label>
                          <br />
                          <label>
                            Organization: &nbsp;
                            <span>{chain['Organization:']}</span>
                          </label>
                          <br />
                          <label>
                            Valid:&nbsp;<span>{chain['Valid:']}</span>
                          </label>
                          <br />
                          <label>
                            Issuer:&nbsp;<span>{chain['Issuer']}</span>
                          </label>
                          <br />
                        </div>
                      ) : (
                        <div />
                      )
                    })}
                </div>
              </div>
            </main>
          </div>
        )}
      </F>
    )
  }
}
export default withRouter(SSL)
