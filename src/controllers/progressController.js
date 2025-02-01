// src/controllers/progressController.js
const ProgressService = require("../services/progressService");
const ResponseService = require("../services/responseService");

class ProgressController {
  static async getProgress(req, res) {
    try {
      const { timeframe = "week" } = req.query;

      let progress;
      if (timeframe === "month") {
        progress = await ProgressService.getMonthlyProgress(req.user._id);
      } else {
        progress = await ProgressService.getWeeklyProgress(req.user._id);
      }

      return ResponseService.success(res, progress);
    } catch (error) {
      console.error("Progress error:", error);
      return ResponseService.error(res, error.message);
    }
  }
}

module.exports = ProgressController;
