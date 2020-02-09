import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import "assets/sass/style.scss"
// import { Navbar } from 'containers'
import Homepage from 'containers/pages/homepage'

class App extends Component {
  render() {
    return (
      <Homepage />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
