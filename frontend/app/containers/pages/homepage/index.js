import React, { Component } from "react"
import Button from "react-bootstrap/lib/Button"
import { TestComponent } from "components"

class Homepage extends Component {
  render() {
    return (
      <div className="container homepage">
        <h3 className="homepage__title">App Homepage</h3>
        <TestComponent />
        <>
          <p>Test</p>
        </>
        <Button onClick={() => {}}>Bootstrap Button</Button>
      </div>
    )
  }
}

export default Homepage
