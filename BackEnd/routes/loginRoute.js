const express = require("express");
const User = require("../modules/user");
const Seller = require("../modules/seller");

const login = express.Router();

// Login per autenticare gli utenti e i venditori
login.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e password sono obbligatori",
      });
    }

    // Cerca prima nel modello User
    let user = await User.findOne({ email });
    if (!user) {
      // Se non trovato, cerca nel modello Seller
      user = await Seller.findOne({ email });
      if (!user) {
        return res.status(401).json({
          error: "Credenziali non valide",
        });
      }
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Credenziali non valide",
      });
    }

    // Risposta con informazioni dell'utente, senza token
    res.status(200).json({
      message: "Login effettuato con successo",
      role: user.role, // Ruolo dell'utente (admin, seller, user)
      userId: user._id, // ID dell'utente
    });
  } catch (err) {
    next(err);
  }
});

module.exports = login;
