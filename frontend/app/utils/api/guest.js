import axios from './axios'

export const postGuest = async (guest) => {
  let res
  try {
    res = await axios.post('/guests/guest', guest)
  } catch (e) {
    console.log('axios error: ', e)
    throw e
  }
  return res.data
}
