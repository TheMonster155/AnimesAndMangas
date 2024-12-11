const addUserAndSeller = (req, res, next) => {
  const { sellerId } = req.body; // Estrarre sellerId dal corpo della richiesta, se presente

  // Assicurati che `req.user` sia già stato settato dal middleware `authenticateToken`
  // Se sellerId è presente nel corpo della richiesta, aggiungilo a `req.seller`
  if (sellerId) {
    req.seller = sellerId;
  }

  // Continua la catena dei middleware
  next();
};

module.exports = addUserAndSeller;
