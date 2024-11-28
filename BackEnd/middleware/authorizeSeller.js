const authorizeSeller = (req, res, next) => {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ error: 'Accesso riservato ai venditori' });
    }
    next();
  };
  
  module.exports = authorizeSeller;
  