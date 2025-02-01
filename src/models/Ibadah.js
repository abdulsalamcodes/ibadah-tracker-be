const mongoose = require("mongoose");

// src/models/Ibadah.js
const ibadahSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily",
  },
  completionStatus: [
    {
      date: {
        type: Date,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ibadah = mongoose.model("Ibadah", ibadahSchema);

module.exports = Ibadah;
