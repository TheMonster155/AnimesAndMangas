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

email.post("/sendEmail", async (req, res, next) => {
  const { email: userEmail, message } = req.body;

  const msg = createEmailMessage(
    userEmail,
    "New Message from the Contact Form",
    `Your message has been received:\n\n${message}\n\nWe will respond as soon as possible.`,
    `
      <p>Your message has been received.</p>
      <p>Here's what you wrote:</p>
      <p><strong>${message}</strong></p>
      <p>We will respond as soon as possible.</p>
    `
  );

  sendEmail(msg, res, next, "Email sent successfully.");
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
