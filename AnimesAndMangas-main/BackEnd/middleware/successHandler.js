// middlewares/emailSuccessHandler.js

const successHandler = (res, message) => {
  res.status(200).send({ statusCode: 200, message });
};

module.exports = successHandler;
