const express = require("express");
const Seller = require("../modules/seller"); // Importa il modello Seller
const router = express.Router();

// POST - Crea un nuovo venditore
router.post("/seller/create", async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      email,
      password,
      gender,
      birthYear,
      address,
      username,
      surname,
      shopName,
      shopAddress,
      vatNumber,
      phone,
      website,
      preferredLanguage,
      paymentMethods,
      bankAccount,
    } = req.body;

    console.log(req.body);
    // Verifica che tutti i campi necessari siano presenti
    if (
      !email ||
      !password ||
      !gender ||
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
        message:
          "Tutti i campi obbligatori per il venditore devono essere compilati",
      });
    }

    // Verifica se l'email è già registrata
    const existingEmail = await Seller.findOne({ email: req.body.email });
    if (existingEmail) {
      return next({
        type: "validation",
        message: "L'email è già registrata",
      });
    }

    // Verifica se lo username è già registrato
    const existingUsername = await Seller.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return next({
        type: "validation",
        message: "Lo username è già registrato",
      });
    }

    // Verifica se la partita IVA è già registrata
    const existingVatNumber = await Seller.findOne({
      vatNumber: req.body.vatNumber,
    });
    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "La Partita IVA è già registrata",
      });
    }

    // Crea un nuovo venditore
    const seller = new Seller({
      email,
      password,
      gender,
      birthYear,
      address,
      username,
      surname,
      role: "seller", // Forziamo il ruolo a "seller"
      sellerDetails: {
        shopName,
        shopAddress,
        vatNumber,
        phone,
        website,
        preferredLanguage,
        paymentMethods,
        bankAccount,
      },
    });

    // Salva il venditore nel database
    await seller.save();

    // Risposta di successo
    res.status(201).json({ message: "Venditore registrato con successo" });
  } catch (err) {
    if (err.code === 11000) {
      // Gestione degli errori di duplicazione di email, username o partita IVA
      return next({
        type: "validation",
        message: "Email, username o Partita IVA già registrati",
      });
    } else {
      next(err); // Passa l'errore al middleware di gestione degli errori
    }
  }
});

// GET - Ottieni tutti i venditori
router.get("/", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Ottieni un venditore per ID
router.get("/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Elimina un venditore per ID
router.delete("/:id", async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH - Aggiorna i dati di un venditore per ID
router.patch("/:id", async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
