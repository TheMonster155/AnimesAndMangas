/*const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Accesso riservato agli amministratori" });
  }
  next();
};

module.exports = authorizeAdmin;
//TODO: cambiare tutte gli avvisi da ita in eng e togiere
*/

// Middleware per autorizzare solo gli amministratori
const authorizeAdmin = (req, res, next) => {
  // Se il ruolo dell'utente non è "admin", restituisce un errore 403 (Accesso vietato)
  console.log("Ruolo dell'utente nel middleware:", req.user.role);
  if (req.user.role !== "admin") {
    console.error("Accesso vietato: ruolo non autorizzato.");
    return res.status(403).json({ error: "Access restricted to admins only" }); // Messaggio di errore in inglese
  }
  // Se l'utente è un amministratore, passa al prossimo middleware
  console.log("Utente autorizzato come admin.");
  next();
};

module.exports = authorizeAdmin;
