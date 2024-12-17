const express = require("express");
const Seller = require("../modules/seller");

const mongoose = require("mongoose");
const seller = express.Router();

seller.post("/seller/create", async (req, res, next) => {
  try {
    const {
      email,
      password,
      surname,
      username,
      birthYear,
      address,
      shopName,
      shopAddress,
      vatNumber,
      phone,
      website,
    } = req.body;

    if (
      !email ||
      !password ||
      !surname ||
      !username ||
      !birthYear ||
      !address ||
      !shopName ||
      !shopAddress ||
      !vatNumber
    ) {
      return res
        .status(400)
        .json({ error: "All mandatory fields must be filled." });
    }

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const newSeller = new Seller({
      email,
      password,
      surname,
      username,
      birthYear,
      address,
      role: "seller",
      sellerDetails: {
        shopName,
        shopAddress,
        vatNumber,
        phone,
        website,
      },
    });

    await newSeller.save();

    res.status(201).json({ message: "Seller successfully created." });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

seller.get("/seller", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

seller.get("/seller/:id", async (req, res) => {
  try {
    const sellerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ error: "Invalid seller ID." });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }

    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

seller.delete("/seller/delete/:id", async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }
    res.status(200).json({ message: "Seller deleted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

seller.patch("/seller/update/:id", async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = seller;
