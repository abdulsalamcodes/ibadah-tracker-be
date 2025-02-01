// src/routes/progressRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ProgressController = require("../controllers/progressController");
router.use(auth); // Protect all progress routes

router.get("/", ProgressController.getProgress);

module.exports = router;
