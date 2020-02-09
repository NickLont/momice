import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'assets/sass/style.scss'
import { Navigation } from 'containers'

class App extends Component {
  render () {
    return (
      <Navigation />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
