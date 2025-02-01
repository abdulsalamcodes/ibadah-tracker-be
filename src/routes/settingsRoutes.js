// src/routes/settingsRoutes.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const SettingsController = require("../controllers/settingsController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const settingsValidation = [
  body("notifications").isBoolean().optional(),
  body("darkMode").isBoolean().optional(),
  body("language").isIn(["en", "ar"]).optional(),
];

router.use(auth); // Protect all settings routes

router.get("/", SettingsController.getSettings);
router.put(
  "/",
  validate(settingsValidation),
  SettingsController.updateSettings
);

module.exports = router;
