// src/services/ibadahService.js
const Ibadah = require("../models/Ibadah");

class IbadahService {
  static async createIbadah(userId, ibadahData) {
    const ibadah = new Ibadah({
      user: userId,
      ...ibadahData,
    });
    await ibadah.save();
    return ibadah;
  }

  static async getUserIbadah(userId) {
    return await Ibadah.find({ user: userId });
  }

  static async getIbadahById(ibadahId, userId) {
    return await Ibadah.findOne({ _id: ibadahId, user: userId });
  }

  static async updateIbadah(ibadahId, userId, updateData) {
    return await Ibadah.findOneAndUpdate(
      { _id: ibadahId, user: userId },
      updateData,
      { new: true }
    );
  }

  static async deleteIbadah(ibadahId, userId) {
    return await Ibadah.findOneAndDelete({ _id: ibadahId, user: userId });
  }

  static async toggleCompletion(ibadahId, userId, date) {
    const ibadah = await this.getIbadahById(ibadahId, userId);
    if (!ibadah) return null;

    const todayStr = date.toISOString().split("T")[0];
    const existingStatus = ibadah.completionStatus.find(
      (status) => status.date.toISOString().split("T")[0] === todayStr
    );

    if (existingStatus) {
      existingStatus.completed = !existingStatus.completed;
    } else {
      ibadah.completionStatus.push({
        date,
        completed: true,
      });
    }

    await ibadah.save();
    return ibadah;
  }

  static async getStats(userId, startDate, endDate) {
    const ibadahs = await Ibadah.find({
      user: userId,
      "completionStatus.date": {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const stats = {
      total: ibadahs.length,
      completed: 0,
      completion_rate: 0,
    };

    ibadahs.forEach((ibadah) => {
      const completedInRange = ibadah.completionStatus.filter(
        (status) =>
          status.completed && status.date >= startDate && status.date <= endDate
      ).length;
      stats.completed += completedInRange;
    });

    stats.completion_rate = (stats.completed / stats.total) * 100;
    return stats;
  }
}

module.exports = IbadahService;
