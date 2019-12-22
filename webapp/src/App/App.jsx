import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./store";
import Navbar from "../views/Navbar";

class App extends Component {
  state = { width: window.innerWidth };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    return (
      <Provider store={store}>
        <div className="header">eagertool</div>
        <Router>
          {this.state.width < 800 ? <Navbar /> : ""}
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
