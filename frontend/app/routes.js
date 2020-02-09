import React from 'react'
import { Homepage } from "./containers"
import { Route, Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />,
    {/*<Route path="/authentication" component={Authentication} /> Example usage of more routes*/}
    {/*<Route path="/player" component={PlayerPage} />*/}
  </Switch>
)

export default Routes
