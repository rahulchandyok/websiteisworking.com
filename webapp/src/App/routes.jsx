import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../views/home/'

export default () => {
  return (
    <Switch>
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'*'} component={Home} />
    </Switch>
  )
}
