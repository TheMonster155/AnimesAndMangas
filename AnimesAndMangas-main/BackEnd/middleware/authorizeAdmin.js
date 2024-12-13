const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.error("Accesso vietato: ruolo non autorizzato.");
    return res.status(403).json({ error: "Access restricted to admins only" });
  }

  next();
};

module.exports = authorizeAdmin;
