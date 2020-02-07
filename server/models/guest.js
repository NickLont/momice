const mongoose = require('mongoose')

const guest = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  hobbies: [{ type: String }],
  events: [{
    type: mongoose.Schema.Types.ObjectID, ref: 'Event', required: true
  }]
}, { versionKey: false })

module.exports = mongoose.model('Guest', guest)
