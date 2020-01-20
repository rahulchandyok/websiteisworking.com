import { connect } from 'react-redux'
import SSL from './ssl'
import Action from './action'

export const mapStateToProps = state => {
  return {
    ssl: state.ssl
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    fetchSSLResponse: (domainName, port) => {
      dispatch(Action.fetchSSLResponse(domainName, port))
    },
    clearSSLResponse: () => {
      dispatch(Action.clearSSLResponse())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SSL)
