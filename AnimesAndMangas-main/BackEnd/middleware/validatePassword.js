const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(password);
};

const passwordValidation = (req, res, next) => {
  const password = req.body.password || req.password;

  if (!validatePassword(password)) {
    return next(
      new Error(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one special character."
      )
    );
  }

  next();
};

module.exports = passwordValidation;
