/*const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token mancante o non valido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token non valido" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
//TODO: cambiare tutte gli avvisi da ita in eng e togiere
*/
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Header Authorization ricevuto:", authHeader);

  // Normalizza l'header eliminando eventuali spazi extra
  const token = authHeader && authHeader.replace(/\s+/g, " ").split(" ")[1];

  console.log("Token estratto:", token);

  if (!token) {
    console.error("Token mancante o header Authorization non valido");
    return res.status(401).json({ error: "Token is missing or invalid" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Errore nella verifica del token:", err.message);
      return res.status(403).json({ error: "Invalid token" });
    }

    console.log("Token verificato con successo. Utente decodificato:", user);
    req.user = user;
    console.log("User ID decodificato:", req.user.userId);

    next();
  });
};

module.exports = authenticateToken;
