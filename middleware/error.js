const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ojbect id
  if (err.name === 'CastError') {
    const message = `Resource not found with this id: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code == 11000) { // code when us ducplicated
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  } 

  // Mongoose validation key
  if (err.name == 'ValidationError') { // code when us ducplicated
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  } 

  res.status(error.statusCode || 500).json({ 
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;