// action creators returning action objects
// TODO action creators should possibly also return Immutable objects to enforce paradigm everywhere
const fetchUserRequest = () => {
  return { type: 'FETCH_USER_REQUEST' }
}
const fetchUserSuccess = (data) => {
  return { type: 'FETCH_USER_SUCCESS', data }
}
const fetchUserFailure = (error) => {
  return { type: 'FETCH_USER_FAILURE', error }
}
const fetchUser = (user) => {
  return { type: 'FETCH_USER', data: user }
}
const logoutUser = () => {
  return { type: 'LOGOUT_USER' }
}

export {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUser,
  logoutUser
}
