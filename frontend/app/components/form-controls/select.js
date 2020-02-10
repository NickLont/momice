import React, { Component } from 'react'
import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'

class Select extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    defaultOptionLabel: PropTypes.string,
    children: PropTypes.node,
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
      defaultOptionLabel,
      children,
      errors,
      touched
    } = this.props
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          as='select'
          className={'form-control' + (errors && touched ? ' is-invalid' : '')}
        >
          {defaultOptionLabel && <option value={''} defaultValue>{defaultOptionLabel}</option>}
          {children}
        </Field>
        <ErrorMessage name={name} component="div" className="invalid-feedback c-form-control__errors" />
      </div>
    )
  }
}

export default Select
