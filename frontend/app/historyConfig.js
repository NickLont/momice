import { createBrowserHistory } from 'history'
// import { createHashHistory } from 'history'

// Router creates a history object accessible from within Components but in order to use this object outside
// Components (like in sagas) we need to create our own history and import it throughout the project
// We can either use HashHistory or BrowserHistory

// const history = createHashHistory()
const history = createBrowserHistory()

export default history
