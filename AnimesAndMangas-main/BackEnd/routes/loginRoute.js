/*const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modules/user");
const Seller = require("../modules/seller");
const token = require("../middleware/authenticateToken");
const login = express.Router();

login.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      return next(error);
    }

    let user = null;
    let role = null;

    // Controlla se l'utente è un seller
    user = await Seller.findOne({ email });
    if (user) {
      role = "seller";
    }

    // Se non è un seller, controlla se è un user
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        role = "user";
      }
    }

    // Se non viene trovato né un Seller né un User, ritorna un errore
    if (!user) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      return next(error);
    }

    // Verifica la password
    console.log("User found:", user);
    const isPasswordValid = await user.comparePassword(password);
    console.log("Password valid:", isPasswordValid); // Log per vedere se la password è corretta

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      return next(error);
    }

    // Genera il token JWT con il ruolo corretto
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Restituisci il token e il ruolo
    res.header("Authorization", `Bearer ${token}`).status(200).json({
      message: "Login successful",
      token,
      role,
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = login;
*/

/*
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

    // Cerca nel modello Seller
    user = await Seller.findOne({ email });
    if (user) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      role = "seller";
    }

    // Cerca nel modello User se non trovato nel modello Seller
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

    // Se non è stato trovato né User né Seller
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Genera il token JWT
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    const token = jwt.sign({ userId: user._id, role, username }, jwtSecret, {
      expiresIn: "2h",
    });

    // Risposta al client
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
*/
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

    // Cerca nel modello Seller
    user = await Seller.findOne({ email });
    if (user) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      role = "seller";
    }

    // Cerca nel modello User se non trovato nel modello Seller
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

    // Se non è stato trovato né User né Seller
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Recupera il username dal documento
    const username = user.username;

    // Genera il token JWT
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    const token = jwt.sign({ userId: user._id, role, username }, jwtSecret, {
      expiresIn: "2h",
    });

    // Risposta al client
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
