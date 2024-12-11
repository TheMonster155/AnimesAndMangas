// Middleware per autorizzare solo i venditori
const authorizeSeller = (req, res, next) => {
  // Se il ruolo dell'utente non è "seller", restituisce un errore 403 (Accesso vietato)
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Access restricted to sellers only" }); // Messaggio di errore in inglese
  }
  // Se l'utente è un venditore, passa al prossimo middleware
  next();
};

module.exports = authorizeSeller;
//TODO: forse in bisognia dire ruolo dell'utente non è "seller" e anche ADMIN
