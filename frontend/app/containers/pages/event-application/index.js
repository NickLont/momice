import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import { EventForm } from 'components'

class EventApplicationPage extends Component {
  render () {
    return (
      <div className="container c-event-application-page">
        <h3 className="c-event-application-page__title">Event Submission</h3>
        <EventForm />
      </div>
    )
  }
}

export default EventApplicationPage
