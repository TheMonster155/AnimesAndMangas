const authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ error: "Accesso riservato agli utenti standard" });
  }
  next();
};

module.exports = authorizeUser;
