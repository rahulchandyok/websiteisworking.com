import HttpUtil from '../../utils/httpUtil';
import { API_URL } from '../../App/Constants.js'
const Action = {
  fetchDnsRecords: (dnsType, website) => {
    return async dispatch => {
      dispatch(Action.toggleIsDnsRecordsFetched());
      HttpUtil.get(
        API_URL.FETCH_DNS_RECORDS,
        { dnsType: dnsType, website: website },
        (response, error) => {
          dispatch(Action.toggleIsDnsRecordsFetched(true));
          if (response && response.data) {
            dispatch(Action.setDnsRecords(response.data));
          } else if (error) {
          }
        }
      );
    };
  },
  setDnsRecords: records => {
    return {
      type: 'SET_DNS_RECORDS',
      payload: { records }
    };
  },
  toggleIsDnsRecordsFetched: val => {
    return {
      type: 'TOGGLE_IS_DNS_RECORDS_FETCHED',
      payload: val
    };
  },
  clearDnsData: () => {
    return {
      type: 'CLEAR_DNS_DATA'
    };
  }
};
export default Action;
