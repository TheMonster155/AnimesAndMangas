const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.replace(/\s+/g, " ").split(" ")[1];

  if (!token) {
    console.error("Token mancante o header Authorization non valido");
    return res.status(401).json({ error: "Token is missing or invalid" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Errore nella verifica del token:", err.message);
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
