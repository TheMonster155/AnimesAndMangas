const express = require('express');
const User = require('../modules/user');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ type: 'validation', message: 'Email e password sono obbligatori' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({ type: 'auth', message: 'Credenziali non valide' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next({ type: 'auth', message: 'Credenziali non valide' });
    }

    res.status(200).json({
      message: 'Login effettuato con successo',
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
