const Guest = require('../models/guest')
const Event = require('../models/event')
const { validateMongooseId, isValidTimestamp } = require('../helpers/validations')
const { ErrorHandler } = require('../helpers/errorHandlers')

// return all guests
exports.allGuests = async (req, res, next) => {
  try {
    const { pageNo, size } = req.query
    // pagination
    if (size && pageNo) {
      const totalCount = await Guest.count()
      const guests = await Guest.find({})
        .skip(parseInt(size) * (parseInt(pageNo) - 1))
        .limit(parseInt(size))
        .catch((e) => { throw new ErrorHandler(500, 'Database error') })
      const response = {
        data: guests,
        pages: Math.ceil(totalCount / size),
        current: Number(pageNo)
      }
      return res.status(200).send(response)
    } else {
      const guests = await Guest.find({}) // parameters: query & projection, 2nd param tells to return only name and description fields (+id that is standard)
      res.status(200).json(guests)
    }
  } catch (e) {
    next(e)
  }
}

// post a guest
// we don't need to check if a user exists here, it can be a case of the same name
exports.postGuest = async (req, res, next) => {
  const { firstName, lastName, email, birthDate, hobbies, eventId } = req.body
  try {
    if (!firstName || !lastName || !email || !birthDate || !hobbies || !eventId) {
      throw new ErrorHandler(422, 'firstName, lastName, email, birthDate, hobbies and eventId are required')
    }
    await validateMongooseId(eventId)
    const event = await Event.findById(eventId)
    // checking if an event with this id exists
    if (!event) throw new ErrorHandler(404, 'Event with this id does not exist')
    isValidTimestamp(birthDate)
    const guest = new Guest({
      firstName,
      lastName,
      email,
      birthDate: birthDate * 1000, // Timestamp epoch is in seconds and mongoose Date is in milliseconds
      hobbies,
      event
    })
    event.guests.push(guest)
    await guest.save().catch(e => { throw new ErrorHandler(500, 'Data failed to save') })
    await event.save().catch(e => { throw new ErrorHandler(500, 'Data failed to save') })
    if (guest.event.guests) guest.event.guests = undefined // Hiding the full list of event guest ids TODO find a better way to implement this
    res.status(200).json(guest)
  } catch (e) {
    next(e)
  }
}

// delete a guest
exports.deleteGuest = async (req, res, next) => {
  const { id } = req.body
  try {
    if (!id) {
      throw new ErrorHandler(422, 'Id is required')
    }
    await validateMongooseId(id)
    const deletedGuest = await Guest.findByIdAndRemove(id)
    if (!deletedGuest) throw new ErrorHandler(404, 'Guest with this id does not exist')
    else {
      res.status(200).json(deletedGuest)
    }
  } catch (e) {
    next(e)
  }
}
