// src/services/progressService.js
const Ibadah = require("../models/Ibadah");
const moment = require("moment");

class ProgressService {
  static async getWeeklyProgress(userId) {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();
    return await this.getProgressForDateRange(userId, startOfWeek, endOfWeek);
  }

  static async getMonthlyProgress(userId) {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();
    return await this.getProgressForDateRange(userId, startOfMonth, endOfMonth);
  }

  static async getProgressForDateRange(userId, startDate, endDate) {
    const ibadahs = await Ibadah.find({ user: userId });
    const dateRange = this.generateDateRange(startDate, endDate);

    const progressByDate = dateRange.map((date) => {
      const dayStats = this.calculateDayStats(ibadahs, date);
      return {
        date: moment(date).format("ddd"),
        fullDate: date,
        completionRate: dayStats.completionRate,
        totalCompleted: dayStats.completed,
        total: ibadahs.length,
      };
    });

    const streaks = await this.calculateStreaks(userId);
    const individualProgress = await this.getIndividualIbadahProgress(
      userId,
      startDate,
      endDate
    );

    return {
      dailyProgress: progressByDate,
      averageCompletion: this.calculateAverage(
        progressByDate.map((d) => d.completionRate)
      ),
      totalCompletions: progressByDate.reduce(
        (acc, day) => acc + day.totalCompleted,
        0
      ),
      streaks,
      individualProgress,
    };
  }

  static calculateDayStats(ibadahs, date) {
    const dateStr = moment(date).format("YYYY-MM-DD");
    let completed = 0;

    ibadahs.forEach((ibadah) => {
      const dayStatus = ibadah.completionStatus.find(
        (status) => moment(status.date).format("YYYY-MM-DD") === dateStr
      );
      if (dayStatus?.completed) completed++;
    });

    return {
      completed,
      completionRate:
        ibadahs.length > 0 ? (completed / ibadahs.length) * 100 : 0,
    };
  }

  static async calculateStreaks(userId) {
    const ibadahs = await Ibadah.find({ user: userId });
    let currentStreak = 0;
    let longestStreak = 0;
    let date = moment();

    // Calculate current streak
    while (true) {
      const dayStats = this.calculateDayStats(ibadahs, date.toDate());
      if (dayStats.completionRate < 100) break;
      currentStreak++;
      date = date.subtract(1, "day");
    }

    return {
      current: currentStreak,
      longest: longestStreak,
    };
  }

  static async getIndividualIbadahProgress(userId, startDate, endDate) {
    const ibadahs = await Ibadah.find({ user: userId });
    return ibadahs.map((ibadah) => {
      const completedDays = ibadah.completionStatus.filter(
        (status) =>
          moment(status.date).isBetween(startDate, endDate, "day", "[]") &&
          status.completed
      ).length;

      const totalDays = moment(endDate).diff(moment(startDate), "days") + 1;

      return {
        id: ibadah._id,
        name: ibadah.name,
        completedDays,
        totalDays,
        completionRate: (completedDays / totalDays) * 100,
      };
    });
  }

  static generateDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);
    const lastDate = moment(endDate);

    while (currentDate <= lastDate) {
      dates.push(currentDate.clone().toDate());
      currentDate.add(1, "days");
    }

    return dates;
  }

  static calculateAverage(numbers) {
    return Math.round(
      numbers.reduce((acc, num) => acc + num, 0) / numbers.length
    );
  }
}

module.exports = ProgressService;
