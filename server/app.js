const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const { handleError } = require('./helpers/errorHandlers')

const eventsRoutes = require('./routes/events')

const app = express()

// Express configuration
// Connecting to the MongoDB database service with retry in case of first connection failure
const connectWithRetry = () => (
  mongoose.connect(process.env.MONGO_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      if (process.env.ENVIRONMENT !== 'testing') console.error('Failed to connect to` mongo on startup - retrying in 1 sec', err)
      setTimeout(connectWithRetry, 1000)
    }
  })
)
connectWithRetry()
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connection.on('connected', () => {
  if (process.env.ENVIRONMENT !== 'testing') console.log('Connected to database')
})

// Registration of middleware for express configuration
// Body parser to validate req. object
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add headers to responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/events', eventsRoutes)

app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
