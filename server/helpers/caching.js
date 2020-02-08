const NodeCache = require('node-cache')
const cache = new NodeCache()
const Event = require('../models/event')

const getCachedEventByName = async (name) => {
  // check if event name already exists, if yes return error response
  // we cash the response to reduce stress to our DB
  const cachedExistingEvent = cache.get(`ExistingEvent-${name}`)
  if (cachedExistingEvent) {
    console.log('cached result')
    return cachedExistingEvent
  } else {
    const existingEvent = await Event.findOne({ name })
    cache.set(`ExistingEvent-${name}`, existingEvent, 5) // TTL is really small for showcase purposes
    console.log('fresh result')
    return existingEvent
  }
}

const getCachedEventById = async (id) => {
  // check if event name already exists, if yes return error response
  // we cash the response to reduce stress to our DB
  const cachedExistingEvent = cache.get(`ExistingEvent-${id}`)
  if (cachedExistingEvent) {
    console.log('cached result')
    return cachedExistingEvent
  } else {
    const existingEvent = await Event.findById(id)
    console.log('existingEvent: ', existingEvent)
    cache.set(`ExistingEvent-${id}`, existingEvent, 5)
    console.log('fresh result')
    return existingEvent
  }
}

module.exports = {
  getCachedEventByName,
  getCachedEventById
}
