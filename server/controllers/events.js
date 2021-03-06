const Event = require('../models/event')
const eventSchema = require('../schemas/event.js')
const { validateEvent, validateMongooseId } = require('../helpers/validations')
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
  const { value, error } = eventSchema.validate({ name, description })
  try {
    // return error response if name param is missing
    if (error) {
      throw new ErrorHandler(422, error.details[0].message)
    }
    await validateEvent(name)
    const event = (description)
      ? new Event({
        name,
        description
      })
      : new Event({
        name
      })
    await event.save().catch(e => { throw new ErrorHandler(500, 'Data failed to save') })
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
    if (name && id) {
      throw new ErrorHandler(422, 'Use either name OR id')
    }
    if (name) {
      const event = await Event.findOne({ name }).populate('guests').catch(e => { throw new ErrorHandler(500, 'Database Error') })
      event ? res.status(200).json(event) : res.status(200).json({})
    }
    if (id) {
      await validateMongooseId(id)
      const event = await Event.findOne({ _id: id }).populate('guests').catch(e => { throw new ErrorHandler(500, 'Database Error') })
      event ? res.status(200).json(event) : res.status(200).json({})
    }
  } catch (e) {
    next(e)
  }
}

// delete an event
exports.deleteEvent = async (req, res, next) => {
  const { id } = req.body
  try {
    if (!id) {
      throw new ErrorHandler(422, 'Id is required')
    }
    await validateMongooseId(id)
    const deletedEvent = await Event.findByIdAndRemove(id)
    if (!deletedEvent) throw new ErrorHandler(404, 'Event with this id does not exist')
    else {
      res.status(200).json(deletedEvent)
    }
  } catch (e) {
    next(e)
  }
}
