const { ErrorHandler } = require('../helpers/errorHandlers')
const Event = require('../models/event')

const validateEvent = async (name) => {
  // return error response if name param is missing
  if (!name) {
    throw new ErrorHandler(422, 'Event name is required')
  }
  // check if event name already exists, if yes return error response
  const existingEvent = await Event.findOne({ name })
  if (existingEvent) {
    throw new ErrorHandler(422, 'Event name already exists')
  }
}

module.exports = {
  validateEvent
}
