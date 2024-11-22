const generalErrorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Errore interno del server';
    res.status(status).json({ error: message });
  };
  
  module.exports = generalErrorMiddleware;
  