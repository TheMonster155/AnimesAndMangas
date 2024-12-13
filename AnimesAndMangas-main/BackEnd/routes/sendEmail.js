const express = require("express");
const sgMail = require("@sendgrid/mail");
const emailSuccessHandler = require("../middleware/successHandler");

const email = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createEmailMessage = (to, subject, text, html) => ({
  to,
  from: "anass.vivaace@hotmail.it",
  subject,
  text,
  html,
});

const sendEmail = async (msg, res, next, successMessage) => {
  try {
    await sgMail.send(msg);
    emailSuccessHandler(res, successMessage);
  } catch (error) {
    next({
      status: 500,
      message: "Error sending email. Please try again later.",
      type: "email_error",
    });
  }
};

email.post("/send", emailSuccessHandler, async (req, res, next) => {
  const { from, subject, text, html } = req.body;

  try {
    const msg = {
      to: process.env.SENDER_EMAIL,
      from: process.env.SENDER_EMAIL,
      "reply-to": from,
      subject,
      text,
      html,
    };

    await sgMail.send(msg);

    res.status(201).send({
      statusCode: 201,
      message: "Email sent successfully",
      msg,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }

    next(error);
  }
});

email.post("/sendEmail/product", async (req, res, next) => {
  const { email: userEmail } = req.body;

  const msg = createEmailMessage(
    userEmail,
    "Product Availability Notification",
    `Thank you for your interest in our products. We will notify you as soon as the product you're interested in becomes available.`,
    `
      <p>Thank you for your interest in our products.</p>
      <p>We will notify you as soon as the product you're interested in becomes available.</p>
      <p>If you have further inquiries, feel free to reach out to us.</p>
    `
  );

  sendEmail(msg, res, next, "Email sent successfully.");
});

module.exports = email;
