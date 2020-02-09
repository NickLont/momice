const Joi = require('@hapi/joi')

const guestSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  gender: Joi.string().min(1).max(10).required(),
  birthDate: Joi.date().timestamp().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  eventId: Joi.string().required()
})

module.exports = guestSchema
