// src/controllers/ibadahController.js
const IbadahService = require("../services/ibadahService");
const ResponseService = require("../services/responseService");

class IbadahController {
  static async create(req, res) {
    try {
      const ibadah = await IbadahService.createIbadah(req.user._id, req.body);
      return ResponseService.success(
        res,
        ibadah,
        "Ibadah created successfully",
        201
      );
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const ibadahs = await IbadahService.getUserIbadah(req.user._id);
      console.log("ibadahs", ibadahs);
      return ResponseService.success(res, ibadahs);
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async getOne(req, res) {
    try {
      const ibadah = await IbadahService.getIbadahById(
        req.params.id,
        req.user._id
      );
      if (!ibadah) return ResponseService.notFound(res, "Ibadah not found");
      return ResponseService.success(res, ibadah);
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      const ibadah = await IbadahService.updateIbadah(
        req.params.id,
        req.user._id,
        req.body
      );
      if (!ibadah) return ResponseService.notFound(res, "Ibadah not found");
      return ResponseService.success(
        res,
        ibadah,
        "Ibadah updated successfully"
      );
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      const ibadah = await IbadahService.deleteIbadah(
        req.params.id,
        req.user._id
      );
      if (!ibadah) return ResponseService.notFound(res, "Ibadah not found");
      return ResponseService.success(res, null, "Ibadah deleted successfully");
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async toggleComplete(req, res) {
    try {
      const ibadah = await IbadahService.toggleCompletion(
        req.params.id,
        req.user._id,
        new Date(req.body.date || Date.now())
      );
      if (!ibadah) return ResponseService.notFound(res, "Ibadah not found");
      return ResponseService.success(
        res,
        ibadah,
        "Completion status toggled successfully"
      );
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }

  static async getStats(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const stats = await IbadahService.getStats(
        req.user._id,
        new Date(startDate),
        new Date(endDate)
      );
      return ResponseService.success(res, stats);
    } catch (error) {
      return ResponseService.error(res, error.message);
    }
  }
}

module.exports = IbadahController;
