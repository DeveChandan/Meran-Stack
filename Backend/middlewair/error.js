

const errorMiddleware = (err, req, res, next) => {
    // Log the error
    console.error(err);

    // Set the response status code
    const statusCode = err.statusCode || 500;
  
    // Set the response JSON
    const response = {
      success: false,
      message: err.message || 'Internal Server Error',
    };
  
    // Send the response
    res.status(statusCode).json(response);
  };
  
  module.exports = errorMiddleware;
  