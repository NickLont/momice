import React, { Component } from 'react'
import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'

class Input extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: PropTypes.string,
    touched: PropTypes.bool
  }
  static defaultProps = {
    name: '',
    type: 'text',
    label: ''
  }

  render () {
    const {
      name,
      label,
      type,
      min,
      max,
      errors,
      touched
    } = this.props
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Field
          id={name}
          name={name}
          type={type}
          min={min}
          max={max}
          className={'form-control' + (errors && touched ? ' is-invalid' : '')}
        />
        <ErrorMessage name={name} component="div" className="invalid-feedback c-form-control__errors" />
      </div>
    )
  }
}

export default Input
