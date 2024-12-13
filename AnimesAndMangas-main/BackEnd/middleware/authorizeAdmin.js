const authorizeAdmin = (req, res, next) => {
  console.log("Ruolo dell'utente nel middleware:", req.user.role);
  if (req.user.role !== "admin") {
    console.error("Accesso vietato: ruolo non autorizzato.");
    return res.status(403).json({ error: "Access restricted to admins only" });
  }

  console.log("Utente autorizzato come admin.");
  next();
};

module.exports = authorizeAdmin;
