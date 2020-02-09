import React, { Component } from 'react'
// import Button from 'react-bootstrap/lib/Button'
import { EventForm } from 'components'
import { EventApi } from 'utils/api/index'

class EventApplicationPage extends Component {
  state = {
    events: [],
    eventsLoading: false
  }
  async componentDidMount () {
    const events = await EventApi.fetchEvents()
    this.setState({
      events: events,
      eventsLoading: true
    })
  }

  render () {
    const { events, eventsLoading } = this.state
    return (
      <div className="container c-event-application-page">
        <h3 className="c-event-application-page__title">Event Submission</h3>
        {(eventsLoading) ? (
          <EventForm events={events} />
        ) : (
          <p className="text-center">Loading Events...</p>
        )}
      </div>
    )
  }
}

export default EventApplicationPage
