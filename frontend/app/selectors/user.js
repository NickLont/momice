import { createSelector } from 'reselect'

export const getUserFromStore = state => state.get('user')

// Reselect memoized selectors. If the values of the input-selectors are the same as the previous call to the selector,
//  it will return the previously computed value instead of calling the transform function.
export const getUserLoading = createSelector(
  getUserFromStore,
  (user) => user.get('loading')
)
export const getUserError = createSelector(
  getUserFromStore,
  (user) => user.get('error')
)
export const getUser = createSelector(
  getUserFromStore,
  (user) => user.get('data')
)
