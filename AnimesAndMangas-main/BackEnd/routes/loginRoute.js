const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modules/user");
const Seller = require("../modules/seller");
const login = express.Router();

login.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    let user = null;
    let role = null;

    user = await Seller.findOne({ email });
    if (user) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      role = "seller";
    }

    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        role = "user";
      }
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const username = user.username;

    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    const token = jwt.sign({ userId: user._id, role, username }, jwtSecret, {
      expiresIn: "2h",
    });

    res.header("Authorization", `Bearer ${token}`).status(200).json({
      message: "Login successful",
      token,
      role,
      userId: user._id,
      username,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = login;
