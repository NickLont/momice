const Joi = require('@hapi/joi')

const eventSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  description: Joi.string().max(256)
})

module.exports = eventSchema
