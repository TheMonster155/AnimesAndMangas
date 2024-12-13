const authorizeAdminOrSeller = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "seller") {
    return res
      .status(403)
      .json({ error: "Access restricted to admins and sellers only" });
  }

  next();
};

module.exports = authorizeAdminOrSeller;
