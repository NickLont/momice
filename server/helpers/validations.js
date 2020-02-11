const isValidId = require('mongoose').Types.ObjectId.isValid
const { ErrorHandler } = require('../helpers/errorHandlers')
const { getCachedEventByName } = require('../helpers/caching')

const validateEvent = async (name) => {
  const existingEvent = await getCachedEventByName(name)
  if (existingEvent) {
    throw new ErrorHandler(422, 'Event name already exists')
  }
}

const validateMongooseId = (id) => {
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
