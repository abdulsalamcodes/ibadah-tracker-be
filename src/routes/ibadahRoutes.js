// src/routes/ibadahRoutes.js
const express = require("express");
const { body, query } = require("express-validator");
const router = express.Router();
const IbadahController = require("../controllers/ibadahController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const ibadahValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("frequency")
    .isIn(["daily", "weekly", "monthly"])
    .withMessage("Invalid frequency"),
];

const dateValidation = [
  query("startDate").isISO8601().withMessage("Invalid start date"),
  query("endDate").isISO8601().withMessage("Invalid end date"),
];

router.use(auth); // Protect all ibadah routes

router.post("/", validate(ibadahValidation), IbadahController.create);
router.get("/", IbadahController.getAll);
router.get("/stats", validate(dateValidation), IbadahController.getStats);
router.get("/:id", IbadahController.getOne);
router.put("/:id", validate(ibadahValidation), IbadahController.update);
router.delete("/:id", IbadahController.delete);
router.post("/:id/toggle", IbadahController.toggleComplete);

module.exports = router;
