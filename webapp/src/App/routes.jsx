import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/home/";
import Dns from "../views/dns/";
import About from "../views/about/";

export default props => {
  return (
    <Switch>
      <Route
        exact
        path={"/home"}
        render={() => <Home isMobile={props.isMobile} {...props} />}
      />
      <Route
        path={"/dns-check"}
        render={() => <Dns isMobile={props.isMobile} {...props} />}
      />
      <Route
        exact
        path={"/about-us"}
        render={() => <About isMobile={props.isMobile} {...props} />}
      />
      <Route
        exact
        path={"*"}
        render={() => <Home isMobile={props.isMobile} {...props} />}
      />
    </Switch>
  );
};
