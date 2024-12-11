const bcrypt = require("bcrypt");

const hashingPassword = async (req, res, next) => {
  if (!req.body.password) return next();

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = hashingPassword;
