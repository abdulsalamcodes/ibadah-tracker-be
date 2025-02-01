// src/services/settingsService.js
const User = require("../models/User");

class SettingsService {
  static async updateSettings(userId, settings) {
    return await User.findByIdAndUpdate(
      userId,
      { settings },
      { new: true }
    ).select("settings");
  }

  static async getSettings(userId) {
    const user = await User.findById(userId).select("settings");
    return user.settings;
  }
}

module.exports = SettingsService;
