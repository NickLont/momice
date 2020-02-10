import React, { Component } from 'react'
import { EventForm } from 'components'
import { EventApi } from 'utils/api/index'

class EventApplicationPage extends Component {
  state = {
    events: [],
    eventsLoaded: false
  }
  async componentDidMount () {
    const events = await EventApi.fetchEvents()
    this.setState({
      events: events,
      eventsLoaded: true
    })
  }

  render () {
    const { events, eventsLoaded } = this.state
    return (
      <div className="container c-event-application-page">
        <h3 className="c-event-application-page__title">Event Submission</h3>
        {(eventsLoaded) ? (
          <EventForm events={events} />
        ) : (
          <p className="text-center">Loading Events...</p>
        )}
      </div>
    )
  }
}

export default EventApplicationPage
