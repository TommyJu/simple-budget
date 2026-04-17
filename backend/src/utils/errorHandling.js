export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    // Remove the constructor from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export const sendErrorResponse = (res, error, context = "") => {
  if (error instanceof AppError) {
    console.info(`Error${context ? " in " + context : ""}:`, error.message);
  } else {
    console.error(`Unexpected error${context ? " in " + context : ""}:`, error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
};
