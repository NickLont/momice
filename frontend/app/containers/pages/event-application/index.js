import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
// import { TestComponent } from 'components'

class EventApplicationPage extends Component {
  render () {
    return (
      <div className="container c-event-application-page">
        <h3 className="c-event-application-page__title">App EventApplicationPage</h3>
        <p>loading: {JSON.stringify('loading')}</p>
        <>
          <p>Test</p>
        </>
        <Button onClick={() => {}}>Bootstrap Button</Button>
      </div>
    )
  }
}

export default EventApplicationPage
