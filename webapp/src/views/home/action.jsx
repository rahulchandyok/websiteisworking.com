import HttpUtil from '../../utils/httpUtil';
import { API_URL } from '../../App/Constants.js'
const Action = {
  fetchRecentSearches: () => {
    return async dispatch => {
      HttpUtil.get(
        API_URL.GET_RECENT_SEARCHES,
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
        API_URL.PING_WEBSITE,
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
