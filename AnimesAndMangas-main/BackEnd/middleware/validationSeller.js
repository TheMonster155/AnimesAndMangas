const Seller = require("../modules/seller");

const validateSeller = async (req, res, next) => {
  const { email, username, vatNumber } = req.body;

  try {
    const existingEmail = await Seller.findOne({ email });
    if (existingEmail) {
      return next({
        type: "validation",
        message: "Email is already registered.",
      });
    }

    const existingUsername = await Seller.findOne({ username });
    if (existingUsername) {
      return next({
        type: "validation",
        message: "Username is already taken.",
      });
    }

    const existingVatNumber = await Seller.findOne({ vatNumber });
    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "VAT number is already registered.",
      });
    }

    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validateSeller;
