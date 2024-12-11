const authorizeAdminOrSeller = (req, res, next) => {
  // Controlla se il ruolo è admin o seller
  console.log("Ruolo dell'utente:", req.user.role);
  if (req.user.role !== "admin" && req.user.role !== "seller") {
    return res
      .status(403)
      .json({ error: "Access restricted to admins and sellers only" });
  }
  // Se l'utente ha il ruolo corretto, passa al prossimo middleware
  next();
};

module.exports = authorizeAdminOrSeller;
