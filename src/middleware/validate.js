// src/middleware/validate.js
const { validationResult } = require("express-validator");
const ResponseService = require("../services/responseService");

const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return ResponseService.validationError(res, errors.array());
  };
};

module.exports = validate;
