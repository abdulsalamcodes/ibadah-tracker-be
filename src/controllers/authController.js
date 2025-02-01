// src/controllers/authController.js
const AuthService = require("../services/authService");
const ResponseService = require("../services/responseService");

class AuthController {
  static async register(req, res) {
    try {
      const { user, token } = await AuthService.register(req.body);
      return ResponseService.success(
        res,
        { user, token },
        "User registered successfully",
        201
      );
    } catch (error) {
      return ResponseService.error(res, error.message, 400);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      return ResponseService.success(res, { user, token }, "Login successful");
    } catch (error) {
      return ResponseService.error(res, error.message, 401);
    }
  }
}

module.exports = AuthController;
