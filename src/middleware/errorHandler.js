// errorHandler.js - Annotated for clarity and documentation

const errorHandler = (err, request, response, next) => {
    const statusCode = response.statusCode && response.statusCode !== 200 ? response.statusCode : 500;

    if (err.name === 'CastError') {
        response.status(400).json({ message: 'Invalid ID format' });
        return;
      }
      
      if (err.name === 'ValidationError') {
        response.status(400).json({ message: err.message });
        return;
      }
      
  
    response.status(statusCode).json({
      message: err.message || 'Something went wrong',
      stack: process.env.NODE_ENV === 'production' ? '💥' : err.stack,
    });
  };
  
  module.exports = errorHandler;