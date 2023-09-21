/*
  const errorMiddleware = (err, req, res, next) => {
    // Log the error
    console.error(err);
  
    // Set the response status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Send the response
    res.status(statusCode).json({ success: false, message });
  };
  
  module.exports = errorMiddleware;
  */

const handleErrors = require("../utils/errorhanding");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found Invalid: ${err.path}`;
    err = new handleErrors(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new handleErrors(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json WebToken Is Invalid, Try Again`;
    err = new handleErrors(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Expired, Try Again`;
    err = new handleErrors(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
