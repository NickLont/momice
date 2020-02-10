import React, { Component } from 'react'
import { ErrorMessage, FieldArray } from 'formik'
import PropTypes from 'prop-types'

class Checkbox extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    values: PropTypes.object
  }
  static defaultProps = {
    name: '',
    type: 'text',
    label: '',
    options: [],
    values: {}
  }
  render () {
    const {
      name,
      label,
      options,
      values
    } = this.props

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <FieldArray
          name={name}
          render={arrayHelpers => (
            <div className="c-checkbox">
              {options.map((option, i) => (
                <div className="c-checkbox__container" key={i}>
                  <label>
                    <input
                      name={name}
                      type="checkbox"
                      value={option}
                      checked={values[name].includes(option)}
                      className="c-checkbox__checkbox"
                      onChange={e => {
                        if (e.target.checked) arrayHelpers.push(option)
                        else {
                          const idx = values[name].indexOf(option)
                          arrayHelpers.remove(idx)
                        }
                      }}
                    />{' '}
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        />
        <ErrorMessage name={name} component="div" className="invalid-feedback" />
      </div>
    )
  }
}

export default Checkbox
