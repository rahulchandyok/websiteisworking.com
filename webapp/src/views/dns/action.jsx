import HttpUtil from '../../utils/httpUtil';
const Action = {
  fetchDnsRecords: (dnsType, website) => {
    return async dispatch => {
      dispatch(Action.toggleIsDnsRecordsFetched());
      HttpUtil.get(
        // 'https://dnschecker.org/api/1/CNAME/www.youtube.com',
        `http://localhost:8080/fetch_records?${dnsType}&${website}`,
        {},
        (response, error) => {
          dispatch(Action.toggleIsDnsRecordsFetched(true));
          if (response && response.data) {
            console.log({ response });
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
  }
};
export default Action;
