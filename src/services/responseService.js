// src/services/responseService.js
class ResponseService {
  static success(res, data = null, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res,
    message = "Internal Server Error",
    statusCode = 500,
    errors = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  static validationError(res, errors) {
    return this.error(res, "Validation Error", 400, errors);
  }

  static notFound(res, message = "Resource not found") {
    return this.error(res, message, 404);
  }

  static unauthorized(res, message = "Unauthorized access") {
    return this.error(res, message, 401);
  }
}

module.exports = ResponseService;
