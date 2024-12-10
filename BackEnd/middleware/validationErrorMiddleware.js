const validationErrorMiddleware = (err, req, res, next) => {
  if (err.type === "validation") {
    return res.status(400).json({ error: err.message || "Validation error" });
  }
  next(err);
};

module.exports = validationErrorMiddleware;
//TODO: cambiare tutte gli avvisi da ita in eng e togiere
