const mongoose = require('mongoose')

const event = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  // TODO probably we don't need that, maybe remove
  guests: [{
    type: mongoose.Schema.Types.ObjectID, ref: 'Guest'
  }]
}, { versionKey: false })

module.exports = mongoose.model('Event', event)
