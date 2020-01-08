import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./store";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

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
    let isMobile = this.state.width < 800;
    return (
      <Provider store={store}>
        <div className="header">eagertool</div>
        <Router>
          {isMobile ? <Navbar /> : ""}
          <Routes isMobile={isMobile} />
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
