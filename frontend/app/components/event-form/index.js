import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import { guestSchema } from 'utils/schemas/guest'
import { Col, Row } from 'react-bootstrap'
import { GENDERS, HOBBIES } from '_constants'
import { Input, Select, Checkbox } from 'components/form-controls'
import { GuestApi } from 'utils/api/index'

class EventForm extends Component {
  static propTypes = {
    events: PropTypes.array
  }
  static defaultProps = {
    events: []
  }

  render () {
    const { events } = this.props
    const todaysDate = new Date().toISOString().split('T')[0]

    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      gender: '',
      hobbies: [],
      eventId: ''
    }
    const onSubmit = async (values, setSubmitting, setStatus) => {
      const birthDateTimestamp = new Date(values.birthDate).getTime()
      const submittingValues = {
        ...values,
        birthDate: Math.floor(birthDateTimestamp / 1000) // converting milliseconds
      }
      try {
        await GuestApi.postGuest(submittingValues)
        setStatus('Submission successful!')
      } catch (e) {
        setStatus('Submission failed')
      }
      setSubmitting(false)
    }
    return events.length > 0 ? ( // If we have more than 1 event, render the form
      <Formik
        initialValues={initialValues}
        validationSchema={guestSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          onSubmit(values, setSubmitting, setStatus)
        }}
      >
        {({
          errors,
          touched,
          values,
          status,
          handleSubmit,
          isSubmitting
        }) => (
          status ? (
            // If we have a result for form submission, show it instead of the form
            <p className="c-event-form__result-message">{status}</p>
          ) : (
            <Form onSubmit={handleSubmit}>
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
                    name="birthDate"
                    label="Date of birth"
                    type="date"
                    max={todaysDate}
                    errors={errors.birthDate}
                    touched={touched.birthDate}
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
                <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting' : 'Register'}
                </button>
                <button type="reset" className="btn btn-secondary">Reset</button>
              </div>
            </Form>
          )
        )}
      </Formik>
    ) : (
      <p className="text-center">No Events Available</p>
    )
  }
}

export default EventForm
