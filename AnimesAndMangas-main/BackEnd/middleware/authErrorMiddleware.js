const authErrorMiddleware = (err, req, res, next) => {
  if (err.type === "Authorization") {
    return res
      .status(401)
      .json({ error: err.message || "Authentication error" });
  }

  next(err);
};

module.exports = authErrorMiddleware;
