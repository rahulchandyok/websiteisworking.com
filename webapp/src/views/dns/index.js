import { connect } from 'react-redux';
import Dns from './dns';
import Action from './action';

export const mapStateToProps = state => {
  return {
    dns: state.dns
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchDnsRecords: (dnsType, website) => {
      dispatch(Action.fetchDnsRecords(dnsType, website));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dns);
