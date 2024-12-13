const authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ error: "Access restricted to standard users only" });
  }

  next();
};

module.exports = authorizeUser;
