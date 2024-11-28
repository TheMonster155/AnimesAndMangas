const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authorizeSeller = require('../middleware/authorizeSeller');

const router = express.Router();

// Rotta protetta per amministratori
router.get('/admin/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: 'Benvenuto, amministratore!' });
});

// Rotta protetta per venditori
router.get('/seller/dashboard', authenticateToken, authorizeSeller, (req, res) => {
  res.status(200).json({ message: 'Benvenuto, venditore!' });
});

module.exports = router;
