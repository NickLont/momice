import React, { Component } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import { GuestListPage, EventApplicationPage } from 'containers'

class Navigation extends Component {
  render () {
    return (
      <Router>
        <nav role="navigation">
          <ul className="navbar">
            <li className="navbar__item">
              <NavLink
                exact
                to='/'
                className="navbar__link"
                activeClassName="navbar__link--active"
              >
                  Event Application
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink
                to='/guest-list'
                className="navbar__link"
                activeClassName="navbar__link--active"
              >
                  Guest List
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/guest-list">
            <GuestListPage />
          </Route>
          <Route path="/">
            <EventApplicationPage />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Navigation
