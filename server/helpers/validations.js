const { ErrorHandler } = require('../helpers/errorHandlers')
const Event = require('../models/event')
const isValidId = require('mongoose').Types.ObjectId.isValid

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

const validateMongooseId = async (id) => {
  // checking if the id is valid
  if (!isValidId(id)) {
    throw new ErrorHandler(401, 'Invalid ID')
  }
}

const isValidTimestamp = (timestamp) => {
  const parsedTimestamp = parseInt(timestamp)
  if (isNaN(parsedTimestamp)) {
    throw new ErrorHandler(401, 'Invalid timestamp')
  }
  const newTimestamp = new Date(parsedTimestamp).getTime()
  if (!(!isNaN(parseFloat(newTimestamp)) && isFinite(newTimestamp))) {
    throw new ErrorHandler(401, 'Invalid timestamp')
  }
}

module.exports = {
  validateEvent,
  validateMongooseId,
  isValidTimestamp
}
