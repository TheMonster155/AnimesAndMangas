const validationErrorMiddleware = (err, req, res, next) => {
    if (err.type === 'validation') {
      return res.status(400).json({ error: err.message || 'Errore di validazione' });
    }
    next(err);
  };
  
  module.exports = validationErrorMiddleware;
  