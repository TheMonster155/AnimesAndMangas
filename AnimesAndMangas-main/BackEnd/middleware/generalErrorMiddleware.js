const generalErrorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred";
  const type = err.type || "general";

  res.status(status).json({
    error: message,
    type,
  });
};

module.exports = generalErrorMiddleware;
