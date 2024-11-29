/*const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const authorizeSeller = require("../middleware/authorizeSeller");
const authorizeUsers = require("../middleware/authorizeUsers");

const router = express.Router();

// Rotta protetta per amministratori
router.get(
  "/admin/dashboard",
  authenticateToken,
  authorizeAdmin,
  (req, res) => {
    res.status(200).json({ message: "Benvenuto, amministratore!" });
  }
);

// Rotta protetta per venditori
router.get(
  "/seller/dashboard",
  authenticateToken,
  authorizeSeller,
  (req, res) => {
    res.status(200).json({ message: "Benvenuto, venditore!" });
  }
);

// Rotta protetta per user
router.get("/user/dashboard", authenticateToken, authorizeUsers, (req, res) => {
  res.status(200).json({ message: "Benvenuto, venditore!" });
});
module.exports = router;
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const authorizeSeller = require("../middleware/authorizeSeller");
const authorizeUser = require("../middleware/authorizeUsers");

const router = express.Router();

// Rotta protetta per amministratori
router.get(
  "/admin/dashboard",
  authenticateToken,
  authorizeAdmin,
  (req, res) => {
    res.status(200).json({
      message: `Benvenuto, amministratore ${req.user.id}`,
    });
  }
);

// Rotta protetta per venditori
router.get(
  "/seller/dashboard",
  authenticateToken,
  authorizeSeller,
  (req, res) => {
    res.status(200).json({
      message: `Benvenuto, venditore ${req.user.id}`,
    });
  }
);

// Rotta protetta per utenti standard
router.get("/user/dashboard", authenticateToken, authorizeUser, (req, res) => {
  res.status(200).json({
    message: `Benvenuto, utente ${req.user.id}`,
  });
});

module.exports = router;
