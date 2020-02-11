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

export const deleteGuest = async (guestId) => {
  let res
  try {
    res = await axios.delete('/guests/guest', {
      data: {
        id: guestId
      }
    })
  } catch (e) {
    console.log('axios error: ', e)
    throw e
  }
  return res.data
}
