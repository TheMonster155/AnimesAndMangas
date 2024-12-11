/*const authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ error: "Accesso riservato agli utenti standard" });
  }
  next();
};

module.exports = authorizeUser;

*/

// Middleware per autorizzare solo gli utenti standard
const authorizeUser = (req, res, next) => {
  // Se il ruolo dell'utente non è "user", restituisce un errore 403 (Accesso vietato)
  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ error: "Access restricted to standard users only" }); // Messaggio di errore in inglese
  }
  // Se l'utente è un utente standard, passa al prossimo middleware
  next();
};

module.exports = authorizeUser;
//TODO: forse in bisognia dire ruolo dell'utente non è "user" e anche ADMIN
