import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/home/';
import Dns from '../views/dns/';

export default () => {
  return (
    <Switch>
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/dns_check'} component={Dns} />
      <Route exact path={'*'} component={Home} />
    </Switch>
  );
};
