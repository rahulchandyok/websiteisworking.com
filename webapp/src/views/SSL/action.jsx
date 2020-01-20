import HttpUtil from '../../utils/httpUtil'
import { API_URL } from '../../App/Constants.js'
const Action = {
  fetchSSLResponse: (domainName, port = 443) => {
    return async dispatch => {
      dispatch(Action.toggleSSLCheckLoader())
      HttpUtil.get(
        API_URL.FETCH_SSL_RESPONSE,
        { domain_name: domainName, port: port },
        (response, error) => {
          dispatch(Action.toggleSSLCheckLoader())
          if (response && response.data) {
            dispatch(Action.setSSLResponse(response.data))
          } else if (error) {
          }
        }
      )
    }
  },
  clearSSLResponse: () => {
    return {
      type: 'CLEAR_SSL_RESPONSE'
    }
  },
  setSSLResponse: sslResponse => {
    return {
      type: 'SET_SSL_RESPONSE',
      payload: { sslResponse }
    }
  },
  toggleSSLCheckLoader: () => {
    return {
      type: 'TOGGLE_SSL_CHECK_LOADER'
    }
  }
}
export default Action
