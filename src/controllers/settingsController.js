// src/controllers/settingsController.js
const SettingsService = require("../services/settingsService");
const ResponseService = require("../services/responseService");

class SettingsController {
  static async getSettings(req, res) {
    try {
      const settings = await SettingsService.getSettings(req.user._id);
      return ResponseService.success(res, settings);
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async updateSettings(req, res) {
    try {
      const settings = await SettingsService.updateSettings(
        req.user._id,
        req.body
      );
      return ResponseService.success(
        res,
        settings,
        "Settings updated successfully"
      );
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }
}

module.exports = SettingsController;
