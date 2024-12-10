const Seller = require("../modules/seller");

const validateSeller = async (req, res, next) => {
  const { email, username, vatNumber } = req.body;

  try {
    // Verifica se l'email è già registrata
    const existingEmail = await Seller.findOne({ email });
    if (existingEmail) {
      return next({
        type: "validation",
        message: "Email is already registered.",
      });
    }

    // Verifica se lo username è già registrato
    const existingUsername = await Seller.findOne({ username });
    if (existingUsername) {
      return next({
        type: "validation",
        message: "Username is already taken.",
      });
    }

    // Verifica se la partita IVA è già registrata
    const existingVatNumber = await Seller.findOne({ vatNumber });
    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "VAT number is already registered.",
      });
    }

    // Se tutte le verifiche passano, continua con la logica del controller
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validateSeller;
