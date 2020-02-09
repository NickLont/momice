import axios from './axios'

export const fetchEvents = async () => {
  let res
  try {
    res = await axios.get('/events/all')
  } catch (e) {
    console.log('axios error: ', e)
    throw e
  }
  return res
}
