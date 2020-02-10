import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { guestSchema } from 'utils/schemas/guest'
import { Col, Row } from 'react-bootstrap'
import { GENDERS, HOBBIES } from '_constants'
import { Input, Select, Checkbox } from 'components/form-controls'

class EventForm extends Component {
  static propTypes = {
    events: PropTypes.array
  }
  static defaultProps = {
    events: []
  }
    onSubmit = (props) => {
      console.log(props)
    }
    render () {
      const { events } = this.props
      const todaysDate = new Date().toISOString().split('T')[0]

      const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '', // TODO this needs to be a timestamp
        gender: '',
        hobbies: [],
        eventId: ''
      }
      return events.length > 0 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={guestSchema}
          onSubmit={this.onSubmit}
          render={({ errors, status, touched, values }) => (
            <Form>
              {console.log('values: ', values)}
              <Row>
                <Col md={12}>
                  <Select
                    name="eventId"
                    label="Event"
                    defaultOptionLabel="Select an event"
                    errors={errors.eventId}
                    touched={touched.eventId}
                  >
                    {events.map(event => (
                      <option value={event._id} key={event._id}>{event.name}: {event.description}</option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Input
                    name="firstName"
                    label="First Name"
                    errors={errors.firstName}
                    touched={touched.firstName}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    errors={errors.lastName}
                    touched={touched.lastName}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Input
                    name="email"
                    label="E mail"
                    type="email"
                    errors={errors.email}
                    touched={touched.email}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    name="dateOfBirth"
                    label="Date of birth"
                    type="date"
                    max={todaysDate}
                    errors={errors.dateOfBirth}
                    touched={touched.dateOfBirth}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Select
                    name="gender"
                    label="Gender"
                    defaultOptionLabel="Select Gender"
                    errors={errors.gender}
                    touched={touched.gender}
                  >
                    {
                      GENDERS.map((gender, i) => (
                        <option value={gender} key={i}>{gender}</option>
                      ))
                    }
                  </Select>
                </Col>
                <Col md={6}>
                  <Checkbox
                    name="hobbies"
                    label="Hobbies"
                    options={HOBBIES}
                    values={values}
                  />
                </Col>
              </Row>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">Register</button>
                <button type="reset" className="btn btn-secondary">Reset</button>
              </div>
            </Form>
          )}
        />
      ) : (
        <p className="text-center">No Events Available</p>
      )
    }
}

export default EventForm
