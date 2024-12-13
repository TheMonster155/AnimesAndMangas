const express = require("express");
const Seller = require("../modules/seller");
const validateSeller = require("../middleware/validationSeller");
const Manga = require("../modules/manga");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const seller = express.Router();

seller.post("/seller/create", validateSeller, async (req, res, next) => {
  try {
    const {
      email,
      password,
      birthYear,
      address,
      username,
      surname,
      shopName,
      shopAddress,
      vatNumber,
      phone,
      website,
      mangaId,
    } = req.body;

    if (
      !email ||
      !password ||
      !birthYear ||
      !address ||
      !username ||
      !surname ||
      !shopName ||
      !shopAddress ||
      !vatNumber
    ) {
      return next({
        type: "validation",
        message: "All mandatory seller fields must be filled.",
      });
    }

    const normalizedVatNumber = vatNumber.trim().toLowerCase();
    const existingVatNumber = await Seller.findOne({
      "sellerDetails.vatNumber": normalizedVatNumber,
    });

    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "VAT number is already registered.",
      });
    }

    const birthDate = new Date(birthYear);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      email,
      password: hashedPassword,
      birthYear: birthDate,
      address,
      username,
      surname,
      role: "seller",
      sellerDetails: {
        shopName,
        shopAddress,
        vatNumber: normalizedVatNumber,
        phone,
        website,
      },
    });

    await newSeller.save();

    if (mangaId && mongoose.Types.ObjectId.isValid(mangaId)) {
      const mangaExists = await Manga.findById(mangaId);
      if (!mangaExists) {
        return next({
          type: "validation",
          message:
            "The manga with the provided ID does not exist in the database.",
        });
      }

      await Seller.findByIdAndUpdate(
        newSeller._id,
        { $push: { createdManga: mangaId } },
        { new: true }
      );
    }

    res.status(201).json({
      message: "Seller successfully registered.",
      seller: {
        _id: newSeller._id,
        email: newSeller.email,
        username: newSeller.username,
        createdManga: newSeller.createdManga || [],
      },
      manga: mangaId ? { _id: mangaId } : null,
    });
  } catch (err) {
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
