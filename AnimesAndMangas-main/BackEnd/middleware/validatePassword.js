const bcrypt = require("bcrypt");
const UserModel = require("../modules/user");
const SellerModel = require("../modules/seller");

const validatePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await SellerModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          statusCode: 404,
          message: "User or Seller not found with the email provided",
        });
      }
      req.seller = user;
    } else {
      req.user = user;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "Password or email not valid",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validatePassword;
