let defaultState = {
  dnsRecords: [],
  pingResponse: {},
  isDnsRecordsFetched: true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DNS_RECORDS': {
      return { ...state, dnsRecords: action.payload.records };
    }
    case 'TOGGLE_IS_DNS_RECORDS_FETCHED': {
      let isFetched =
        action.payload !== undefined
          ? action.payload
          : !state.isDnsRecordsFetched;
      return { ...state, isDnsRecordsFetched: isFetched };
    }
    default:
      return state;
  }
};
