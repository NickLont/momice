import axios from './axios'

export const getEvents = async () => {
  let res
  try {
    res = await axios.get('/events/all')
  } catch (e) {
    console.log('axios error: ', e)
    throw e
  }
  return res.data
}

export const getEvent = async (eventId) => {
  let res
  try {
    res = await axios.get('/events/event', {
      params: { id: eventId }
    })
  } catch (e) {
    console.log('axios error: ', e)
    throw e
  }
  return res.data
}
