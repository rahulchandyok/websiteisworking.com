import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/home/";
import Dns from "../views/dns/";
import About from "../views/about/";

export default () => {
  return (
    <Switch>
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/dns-check"} component={Dns} />
      <Route exact path={"/about-us"} component={About} />
      <Route exact path={"*"} component={Home} />
    </Switch>
  );
};
