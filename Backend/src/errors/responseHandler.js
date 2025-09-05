const { StatusCodes, ReasonPhrases, getReasonPhrase } = require("http-status-codes");

  // Success Response (Professional)
const successResponse = (
  res,
  message,
  data = null,
  code = StatusCodes.OK,
  meta = null,
  token = null
) => {
  return res.status(code).json({
    success: true,
    code,
    status: getReasonPhrase(code),
    message,
    ...(data && { data }),
    ...(token && { token }),
    ...(meta && { meta }),
  });
};

  // Error Response (Professional)

const errorResponse = (
  res,
  message,
  error = null,
  code = StatusCodes.BAD_REQUEST
) => {
  let errors = [];

  if (Array.isArray(error)) {
    errors = error;
  } else if (typeof error === "string") {
    errors = [error];
  } else if (error?.message) {
    errors = [error.message];
  } else {
    errors = ["An unknown error occurred."];
  }

  return res.status(code).json({
    success: false,
    code,
    status: getReasonPhrase(code),
    message,
    errors,
  });
};


  // Global Error Handler Middleware

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const statusCode =err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    status: getReasonPhrase(statusCode),
    message,
    errors: [message],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { successResponse, errorResponse, errorHandler };
