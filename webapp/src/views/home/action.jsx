import HttpUtil from '../../utils/httpUtil';
const Action = {
  fetchRecentSearches: () => {
    return async dispatch => {
      HttpUtil.get(
        // 'https://website-is-working.herokuapp.com/get_recent_searches',
        'http://localhost:8080/get_recent_searches',
        {},
        (response, error) => {
          if (response && response.data) {
            dispatch(Action.setRecentSearches(response.data));
          } else if (error) {
          }
        }
      );
    };
  },
  setRecentSearches: recentSearches => {
    return {
      type: 'SET_RECENT_SEARCHES',
      payload: { recentSearches }
    };
  },
  pingWebsite: website => {
    return async dispatch => {
      dispatch(Action.togglePingWebsiteLoader());
      HttpUtil.get(
        'http://localhost:8080/ping_website',
        { website: website },
        (response, error) => {
          console.log(response);
          if (response && response.data) {
            let pingResponse = response.data;
            console.log(response.data);
            dispatch(Action.togglePingWebsiteLoader());
            dispatch(Action.setPingResponse(pingResponse));
            dispatch(Action.fetchRecentSearches());
          } else if (error) {
            dispatch(Action.togglePingWebsiteLoader());
          }
        }
      );
    };
  },
  setPingResponse: pingResponse => {
    return {
      type: 'SET_PING_RESPONSE',
      payload: { pingResponse }
    };
  },
  togglePingWebsiteLoader: () => {
    return {
      type: 'TOGGLE_PING_WEBSITE_LOADER'
    };
  },
  resetPingResponse: () => {
    return {
      type: 'RESET_PING_RESPONSE'
    };
  }
};
export default Action;
