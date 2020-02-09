import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import PropTypes from 'prop-types'
import { guestSchema } from 'utils/schemas/guest'
import { Col, Row } from 'react-bootstrap'

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
      const hobbies = ['Video Games', 'Climbing', 'Sports', 'Drawing']
      const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '', // TODO this needs to be a timestamp
        gender: '',
        hobbies: [],
        eventId: events.length > 0 ? events[0]._id : ''
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
                  <div className="form-group">
                    <label htmlFor="eventId">Select Event</label>
                    <Field
                      name="eventId"
                      as='select'
                      className="form-control"
                    >
                      {events.map(event => (
                        <option value={event._id} key={event._id}>{event.name}: {event.description}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="eventId" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                  </div>

                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <Field
                      name="dateOfBirth"
                      type="date"
                      max={todaysDate}
                      className={'form-control' + (errors.dateOfBirth && touched.dateOfBirth ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <Field name="gender" type="text" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} />
                    <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="hobbies">Hobbies</label>
                    <FieldArray
                      name="hobbies"
                      render={arrayHelpers => (
                        <div className="c-checkbox">
                          {hobbies.map((hobbie, i) => (
                            <div className="c-checkbox__container" key={i}>
                              <label>
                                <input
                                  name="categoryIds"
                                  type="checkbox"
                                  value={hobbie}
                                  checked={values.hobbies.includes(hobbie)}
                                  className="c-checkbox__checkbox"
                                  onChange={e => {
                                    if (e.target.checked) arrayHelpers.push(hobbie)
                                    else {
                                      const idx = values.hobbies.indexOf(hobbie)
                                      arrayHelpers.remove(idx)
                                    }
                                  }}
                                />{' '}
                                {hobbie}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <ErrorMessage name="hobbies" component="div" className="invalid-feedback" />
                  </div>
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
