import { connect } from 'react-redux';
import About from './about';

export const mapStateToProps = state => {
  return {
    about: state.about
  };
};

export const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
