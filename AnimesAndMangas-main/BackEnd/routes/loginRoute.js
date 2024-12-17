const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const validatePassword = require("../middleware/validatePassword");
const login = express.Router();
const Seller = require("../modules/seller");
login.post("/login", [validatePassword], async (req, res, next) => {
  try {
    const user = req.user;
    const seller = req.seller;

    let role, username, userId;

    if (user) {
      role = user.role;
      username = user.username;
      userId = user._id;
    } else if (seller) {
      role = "seller";
      username = seller.username;
      userId = seller._id;
    } else {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid user or seller",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";

    const token = jwt.sign({ _id: userId, role, username }, jwtSecret, {
      expiresIn: "2h",
    });

    res.header("Authorization", `Bearer ${token}`).status(200).json({
      message: "Login successful",
      token,
      role,
      userId,
      username,
    });
  } catch (err) {
    next(err);
  }
});

login.post("/login/seller", [validatePassword], async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).send({
        statusCode: 400,
        message: "Seller not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";

    const token = jwt.sign(
      { _id: seller._id, role: seller.role, username: seller.username },
      jwtSecret,
      { expiresIn: "2h" }
    );

    res.header("Authorization", `Bearer ${token}`).status(200).json({
      message: "Login successful",
      token,
      role: seller.role,
      userId: seller._id,
      username: seller.username,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = login;
