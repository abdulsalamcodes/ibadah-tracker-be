// src/routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const AuthController = require("../controllers/authController");
const validate = require("../middleware/validate");

const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").notEmpty().withMessage("Name is required"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", validate(registerValidation), AuthController.register);
router.post("/login", validate(loginValidation), AuthController.login);

module.exports = router;
