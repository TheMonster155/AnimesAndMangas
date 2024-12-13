const authorizeSeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Access restricted to sellers only" });
  }

  next();
};

module.exports = authorizeSeller;
