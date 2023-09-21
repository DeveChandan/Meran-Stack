const mongoose = require('mongoose');

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = handleErrors;
