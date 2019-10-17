let defaultState = {
    recentSearches: [],
    pingResponse: {},
    pingWebsiteLoader: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_RECENT_SEARCHES': {
            return { ...state, recentSearches: action.payload.recentSearches }
        }
        case 'SET_PING_RESPONSE': {
            return { ...state, pingResponse: action.payload.pingResponse }
        }
        case 'TOGGLE_PING_WEBSITE_LOADER': {
            return { ...state, pingWebsiteLoader: !state.pingWebsiteLoader }
        }
        case 'RESET_PING_RESPONSE': {
            return { ...state, pingResponse: {} }
        }
        default:
            return state
    }
}
