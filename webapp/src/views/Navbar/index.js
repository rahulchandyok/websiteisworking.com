import { connect } from "react-redux";
import Navbar from "./navbar";

export const mapStateToProps = state => {
  return {
    dns: state.dns
  };
};

export const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
