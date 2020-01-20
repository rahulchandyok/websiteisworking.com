let defaultState = {
  sslResponse: {},
  sslCheckLoader: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SSL_RESPONSE': {
      return { ...state, sslResponse: action.payload.sslResponse }
    }
    case 'TOGGLE_SSL_CHECK_LOADER': {
      return { ...state, sslCheckLoader: !state.sslCheckLoader }
    }
    case 'CLEAR_SSL_RESPONSE': {
      return { ...state, sslResponse: {} }
    }
    default:
      return state
  }
}
