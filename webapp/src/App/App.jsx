import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./store";
import Navbar from "../views/Navbar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
