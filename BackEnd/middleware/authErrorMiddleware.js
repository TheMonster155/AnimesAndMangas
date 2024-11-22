const authErrorMiddleware = (err, req, res, next) => {
    if (err.type === 'auth') {
      return res.status(401).json({ error: err.message || 'Errore di autenticazione' });
    }
    next(err);
  };
  
  module.exports = authErrorMiddleware;
  