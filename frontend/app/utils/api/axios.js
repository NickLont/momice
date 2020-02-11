import Axios from 'axios'

// create a new instance of axios with a custom config.
const axios = Axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3002',
  timeout: 1000
  // headers: { 'X-Custom-Header': 'foobar' }
})

export default axios
