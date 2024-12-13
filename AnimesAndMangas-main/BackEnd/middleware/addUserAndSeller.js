const addUserAndSeller = (req, res, next) => {
  const { sellerId } = req.body;
  if (sellerId) {
    req.seller = sellerId;
  }

  next();
};

module.exports = addUserAndSeller;
