const mongoose = require('mongoose')
const isValidId = mongoose.Types.ObjectId.isValid
const { validateEvent } = require('../helpers/validations')
const Event = require('../models/event')
const { ErrorHandler } = require('../helpers/errorHandlers')

// return all events
exports.allEvents = async (req, res, next) => {
  try {
    const { pageNo, size } = req.query
    // pagination
    if (size && pageNo) {
      const totalCount = await Event.count()
      const events = await Event.find({}, { name: 1, description: 1 })
        .skip(parseInt(size) * (parseInt(pageNo) - 1))
        .limit(parseInt(size))
        .catch((e) => { throw new ErrorHandler(500, 'Database error') })
      const response = {
        data: events,
        pages: Math.ceil(totalCount / size),
        current: Number(pageNo)
      }
      return res.status(200).send(response)
    } else {
      const events = await Event.find({}, { name: 1, description: 1 }) // parameters: query & projection, 2nd param tells to return only name and description fields (+id that is standard)
      res.status(200).json(events)
    }
  } catch (e) {
    next(e)
  }
}

// post an event
exports.postEvent = async (req, res, next) => {
  const { name, description } = req.body
  try {
    await validateEvent(name)
    const event = (description)
      ? new Event({
        name,
        description
      })
      : new Event({
        name
      })
    event.save().catch(e => { throw new ErrorHandler(500, 'Data failed to save') })
    res.status(200).json(event)
  } catch (e) {
    next(e)
  }
}

// get an event
exports.getEvent = async (req, res, next) => {
  const { name, id } = req.query
  try {
    if (!name && !id) {
      throw new ErrorHandler(422, 'Event name or id is required')
    }
    if (name) {
      const event = await Event.findOne({ name }).catch(e => { throw new ErrorHandler(500, 'Database Error') })
      event ? res.status(200).json(event) : res.status(200).json({})
    }
    if (id) {
      // checking if the id is valid
      if (!isValidId(id)) {
        throw new ErrorHandler(401, 'Invalid ID')
      }
      const event = await Event.findOne({ _id: id }).catch(e => { throw new ErrorHandler(500, 'Database Error') })
      event ? res.status(200).json(event) : res.status(200).json({})
    }
  } catch (e) {
    next(e)
  }
}