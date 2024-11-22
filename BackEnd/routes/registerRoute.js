const express = require('express');
const User = require('../modules/user');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, gender, birthYear, address, username, surname } = req.body;

    // Verifica che tutti i campi necessari siano presenti
    if (!email || !password || !gender || !birthYear || !address || !username || !surname) {
      return next({ type: 'validation', message: 'Tutti i campi sono obbligatori' });
    }

    const user = new User({ email, password, gender, birthYear, address, username, surname });
    await user.save();

    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (err) {
    if (err.code === 11000) {
      next({ type: 'validation', message: 'Email o username già registrati' });
    } else {
      next(err);
    }
  }
});

module.exports = router;
