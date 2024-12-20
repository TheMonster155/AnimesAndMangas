const express = require("express");
const User = require("../modules/user");

const register = express.Router();

register.post("/user/create", async (req, res, next) => {
  try {
    const { email, password, surname, username, role } = req.body;

    if (!email || !password || !surname || !username) {
      return res
        .status(400)
        .json({ error: "All mandatory fields must be filled." });
    }

    const validRoles = ["user", "seller"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        error: `Invalid role. Allowed values are: ${validRoles.join(", ")}`,
      });
    }

    const newUser = new User({
      email,
      password,
      surname,
      username,
      role: role || "user",
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User successfully created.", user: newUser });
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
