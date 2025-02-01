// src/services/authService.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthService {
  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  }

  static async register(userData) {
    const { email, password, name } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = this.generateToken(user._id);
    return { user, token };
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user._id);
    return { user, token };
  }
}

module.exports = AuthService;
