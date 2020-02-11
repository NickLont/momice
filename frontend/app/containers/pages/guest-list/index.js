import React, { Component } from 'react'
import { EventApi, GuestApi } from 'utils/api'
import { Col, Row } from 'react-bootstrap'

class GuestListPage extends Component {
  state = {
    events: [],
    eventsLoaded: false,
    optionValue: '',
    error: false,
    event: null
  }
  async componentDidMount () {
    const events = await EventApi.getEvents()
    this.setState({
      events: events,
      eventsLoaded: true
    })
  }
  onChangeEvent = async (e) => {
    const { value } = e.target
    this.setState({ optionValue: value })
    let response
    if (value) {
      try {
        response = await EventApi.getEvent(value)
        this.setState({ event: response, error: false })
      } catch (e) {
        this.setState({ error: true, event: null })
      }
    }
  }
  onDeleteGuest = async (userId) => {
    if (userId) {
      const response = await GuestApi.deleteGuest(userId)
      if (response) {
        const event = await EventApi.getEvent(response.event)
        if (event) {
          this.setState({ event: event, error: false })
        }
      }
    }
  }
  render () {
    const {
      events,
      event,
      eventsLoaded,
      optionValue,
      error
    } = this.state

    return (
      <div className="container c-guest-list-page">
        <h3 className="c-guest-list-page__title">Select an event to view the guest list</h3>
        <Row>
          <Col md={12}>
            {eventsLoaded && (
              <select
                className="form-control c-guest-list-page__event-select"
                onChange={this.onChangeEvent} value={optionValue}
              >
                <option value=''>Select Event</option>
                {events.map(event => (
                  <option key={event._id} value={event._id}>{event.name} {event.description}</option>
                ))}
              </select>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {error && (<p>An error occured</p>)}
            {event && event.guests.length > 0 && (
              <ul className="list-group">
                {
                  event.guests.map(guest => (
                    <li className="list-group-item" key={guest._id}>
                      <span className="name">Name: {guest.firstName} {guest.lastName}</span>
                      <span className="email"> Email: {guest.email}</span>
                      <button className="btn btn-default btn-xs pull-right remove-item">
                        <span className="glyphicon glyphicon-remove" onClick={() => this.onDeleteGuest(guest._id)} />
                      </button>
                    </li>
                  ))
                }
              </ul>
            )}
            {event && event.guests.length === 0 && (
              <h4 className="text-center">No guests have subscribed to this event</h4>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default GuestListPage
