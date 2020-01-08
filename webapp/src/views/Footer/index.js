import { connect } from "react-redux";
import Footer from "./footer";

export const mapStateToProps = state => {
  return {
    dns: state.dns
  };
};

export const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
