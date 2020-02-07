// Using .env file
require('dotenv').config({ path: '../.env' })

// Express settings
const app = require('./app')

// Bind app to port
app.set('port', process.env.PORT || 3002)

// Start app
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
