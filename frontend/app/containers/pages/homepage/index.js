import React, { Component } from "react"
import Button from "react-bootstrap/lib/Button"
import { TestComponent } from "components"
import { connect } from 'react-redux'
import { UserActions } from 'actions'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { UserSelector } from 'selectors'

class Homepage extends Component {
  onClick = () => {
    const { fetchUser } = this.props
    fetchUser('Nick')
  }

  render() {
    const { user, error, loading } = this.props
    return (
      <div className="container homepage">
        <h3 className="homepage__title">App Homepage</h3>
        <p>user: {user ? user : 'No user'}</p>
        <p>error: {error ?  error : 'No error'}</p>
        <p>loading: {JSON.stringify(loading)}</p>
        <TestComponent />
        <>
          <p>Test</p>
        </>
        <Button onClick={this.onClick}>Bootstrap Button</Button>
      </div>
    )
  }
}
Homepage.propTypes = {
  user: ImmutablePropTypes.map,
  error: PropTypes.string,
  loading: PropTypes.bool,
  fetchUser: PropTypes.func
}

const mapStateToProps = state => {
  return {
    user: UserSelector.getUser(state),
    error: UserSelector.getUserError(state),
    loading: UserSelector.getUserLoading(state)
  }
}
const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(UserActions.fetchUser('Nick'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage)
