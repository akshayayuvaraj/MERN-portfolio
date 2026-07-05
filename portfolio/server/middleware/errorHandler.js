const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`)

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors).map(e => e.message).join(', ')
  }

  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 400
    message = 'Duplicate value entered'
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler