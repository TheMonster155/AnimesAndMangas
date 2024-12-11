const express = require("express");
const session = require("express-session");
const passport = require("passport");
const google = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserModel = require("../modules/user");

google.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

google.use(passport.initialize());
google.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ email: profile._json.email });

        if (!user) {
          const { _json: profileData } = profile;

          // Imposta birthYear come l'anno corrente se non presente nel profilo Google
          const birthYear = profileData.birthYear || new Date().getFullYear();

          const tempPassword = "123456789"; // Password predefinita

          const userToSave = new UserModel({
            name: profileData.given_name,
            surname: profileData.family_name,
            email: profileData.email,
            birthYear: birthYear, // Usa birthYear o l'anno corrente
            password: tempPassword, // Password predefinita
            username: `${profileData.given_name}_${profileData.family_name}`,
          });

          user = await userToSave.save(); // Salva il nuovo utente
        }

        done(null, user); // Completa l'autenticazione
      } catch (error) {
        console.log(error);
        done(error, null); // Gestione degli errori
      }
    }
  )
);

google.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

google.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const tokenPayload = {
      username: user.username,
      surname: user.surname,
      email: user.email,
      birthYear: user.birthYear,
      _id: user._id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  }
);

google.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error logging out:", err);
      return res.redirect("/");
    }
    req.session.destroy((err) => {
      if (err) {
        console.log("Errore durante la distruzione della sessione:", err);
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    });
  });
});

module.exports = google;