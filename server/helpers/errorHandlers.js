/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/
class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, res) => {
  const { message } = err
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
