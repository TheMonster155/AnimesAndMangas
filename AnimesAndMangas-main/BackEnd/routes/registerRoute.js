/*const express = require("express");
const User = require("../modules/user");

const register = express.Router();
//TODO: cambiare tutte gli avvisi da ita in eng  + fetch aggiungere get e altri 
register.post("/user/create", async (req, res, next) => {
  try {
    const { email, password, gender, birthYear, address, username, surname } =
      req.body;

    if (
      !email ||
      !password ||
      !gender ||
      !birthYear ||
      !address ||
      !username ||
      !surname
    ) {
      return next({
        type: "validation",
        message: "Tutti i campi sono obbligatori",
      });
    }

    const user = new User({
      email,
      password,
      gender,
      birthYear,
      address,
      username,
      surname,
    });
    await user.save();

    res.status(201).json({ message: "Utente registrato con successo" });
  } catch (err) {
    if (err.code === 11000) {
      next({ type: "validation", message: "Email o username già registrati" });
    } else {
      next(err);
    }
  }
});

module.exports = register;
*/

const express = require("express");
const User = require("../modules/user");
const token = require("../middleware/authenticateToken");
const register = express.Router();
register.post("/user/create", async (req, res, next) => {
  try {
    console.log(req.body);

    const { email, password, surname, username } = req.body;

    if (!email || !password || !surname || !username) {
      return res
        .status(400)
        .json({ error: "All mandatory fields must be filled." });
    }

    const newUser = new User({
      email,
      password,
      surname,

      username,
    });

    await newUser.save();

    res.status(201).json({ message: "User successfully created." });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

register.get("/user", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

register.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return next({ type: "not_found", message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

register.patch("/user/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return next({ type: "not_found", message: "User not found." });
    }
    res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (err) {
    next(err);
  }
});

register.delete("/user/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return next({ type: "not_found", message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
});

module.exports = register;
