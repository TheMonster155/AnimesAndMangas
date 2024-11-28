/*const express = require('express');
const User = require('../modules/user');

const router = express.Router();

// Login per amministratori
router.post('/admin/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ type: 'validation', message: 'Email e password sono obbligatori' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({ type: 'auth', message: 'Credenziali non valide' });
    }

    // Verifica la password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next({ type: 'auth', message: 'Credenziali non valide' });
    }

    // Permetti il login solo se il ruolo è "admin"
    if (user.role !== 'admin') {
      return next({ type: 'auth', message: 'Accesso non autorizzato per questo ruolo' });
    }

    // Risposta con il ruolo e un messaggio
    res.status(200).json({
      message: 'Login amministratore effettuato con successo',
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../modules/user');

const router = express.Router();

// Login per amministratori
router.post('/admin/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ type: 'validation', message: 'Email e password sono obbligatori' });
    }

    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return next({ type: 'auth', message: 'Credenziali non valide o non sei un amministratore' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next({ type: 'auth', message: 'Credenziali non valide' });
    }

    // Generazione del token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login amministratore effettuato con successo',
      token,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
