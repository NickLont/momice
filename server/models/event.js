const mongoose = require('mongoose')

const event = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  guests: [{
    type: mongoose.Schema.Types.ObjectID, ref: 'Guest'
  }]
}, { versionKey: false })

module.exports = mongoose.model('Event', event)
