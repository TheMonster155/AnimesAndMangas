const bcrypt = require("bcrypt");

const comparePassword = async (password, hashedPassword) => {
  // Confronta la password in chiaro con quella hashata
  return bcrypt.compare(password, hashedPassword);
};

module.exports = comparePassword;
