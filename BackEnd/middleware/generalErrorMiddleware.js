/*const generalErrorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred"; //'Errore interno del server'
  res.status(status).json({ error: message });
};

module.exports = generalErrorMiddleware;
//TODO: cambiare tutte gli avvisi da ita in eng e togiere
*/

const generalErrorMiddleware = (err, req, res, next) => {
  const status = err.status || 500; // Usa lo stato specificato o 500 come default
  const message = err.message || "An unexpected error occurred"; // Messaggio di default
  const type = err.type || "general"; // Tipo di errore, se specificato

  res.status(status).json({
    error: message, // Messaggio di errore
    type, // Tipo di errore
  });
};

module.exports = generalErrorMiddleware;
