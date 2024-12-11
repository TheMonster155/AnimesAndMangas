/*
const authErrorMiddleware = (err, req, res, next) => {
  if (err.type === "auth") {
    return res
      .status(401)
      .json({ error: err.message || "Errore di autenticazione" });
  }
  next(err);
};

module.exports = authErrorMiddleware;
//TODO: cambiare tutte gli avvisi da ita in eng e togiere
*/

// Middleware per gestire gli errori di autenticazione
const authErrorMiddleware = (err, req, res, next) => {
  // Se l'errore è di tipo "auth", restituisci un errore 401 (Non autorizzato)
  if (err.type === "Authorization") {
    return res
      .status(401)
      .json({ error: err.message || "Authentication error" }); // Messaggio di errore in inglese
  }
  // Passa l'errore al prossimo middleware
  next(err);
};

module.exports = authErrorMiddleware;
