/**
 * @desc Global error handling middleware for Express
 * @param {Error} err - The error object thrown in controllers or routes
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * This middleware catches any unhandled errors thrown during
 * request processing and returns a consistent JSON error response.
 */
export const errorHandler = (err, req, res, next) => {
  // Log the error stack trace for debugging (visible only in development)
  console.error(err.stack);

  // If no specific error code is set, default to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send a JSON error response
  res.status(statusCode).json({
    message: err.message || "Server Error", // Short error message
    // Show stack trace only in development mode for safety
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};
