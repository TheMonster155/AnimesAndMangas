/*const express = require("express");
const Seller = require("../modules/seller");
const seller = express.seller();
//TODO: cambiare tutte gli avvisi da ita in eng  +tutte le verifihe se possibili farli in middelware + errori
seller.post("/seller/create", async (req, res, next) => {
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
    // Verifica che tutti i campi
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

    // Verifica se l'email è
    const existingEmail = await Seller.findOne({ email: req.body.email });
    if (existingEmail) {
      return next({
        type: "validation",
        message: "L'email è già registrata",
      });
    }

    // Verifica se lo username
    const existingUsername = await Seller.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return next({
        type: "validation",
        message: "Lo username è già registrato",
      });
    }

    // Verifica se la partita IVA
    const existingVatNumber = await Seller.findOne({
      vatNumber: req.body.vatNumber,
    });
    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "La Partita IVA è già registrata",
      });
    }

    const seller = new Seller({
      email,
      password,
      gender,
      birthYear,
      address,
      username,
      surname,
      role: "seller",
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

    await seller.save();

    res.status(201).json({ message: "Venditore registrato con successo" });
  } catch (err) {
    if (err.code === 11000) {
      return next({
        type: "validation",
        message: "Email, username o Partita IVA già registrati",
      });
    } else {
      next(err);
    }
  }
});

seller.get("/", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

seller.get("/:id", async (req, res) => {
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

seller.delete("/:id", async (req, res) => {
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

seller.patch("/:id", async (req, res) => {
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

module.exports = seller;
*/
const express = require("express");
const Seller = require("../modules/seller");
const validateSeller = require("../middleware/validationSeller"); // Importa il middleware
const Manga = require("../modules/manga"); // Assicurati che il percorso sia corretto
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); // Aggiungi questa riga per importare mongoose
const seller = express.Router();

seller.post("/seller/create", validateSeller, async (req, res, next) => {
  console.log("Request body:", req.body);
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
    console.log("Error occurred:", err);
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

    // Verifica se l'ID è valido
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
/*
seller.post("/seller/create", validateSeller, async (req, res, next) => {
  console.log("Request body:", req.body); // Log del body della richiesta
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
    } = req.body;

    // Convertire `birthYear` in un oggetto `Date`
    const birthDate = new Date(birthYear);
    console.log("Birth date converted:", birthDate);

    // Log dei valori estratti dal corpo della richiesta
    console.log("Extracted values:", {
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
    });

    // Verifica che tutti i campi obbligatori siano presenti
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
      console.log("Missing mandatory fields.");
      return next({
        type: "validation",
        message: "All mandatory seller fields must be filled.",
      });
    }

    // Rimuovi eventuali spazi extra e convertili a minuscolo per evitare problemi di formattazione
    const normalizedVatNumber = vatNumber.trim().toLowerCase();
    console.log("Normalized VAT number:", normalizedVatNumber);

    // Verifica se il vatNumber è già registrato nel database
    console.log("Checking if VAT number exists in database...");
    const existingVatNumber = await Seller.findOne({
      "sellerDetails.vatNumber": normalizedVatNumber,
    });

    console.log("Existing VAT number:", existingVatNumber); // Log per vedere cosa restituisce la query

    // Se esiste un venditore con lo stesso vatNumber, ritorna un errore
    if (existingVatNumber) {
      console.log("VAT number already registered.");
      return next({
        type: "validation",
        message: "VAT number is already registered.",
      });
    }

    // Crea un nuovo venditore
    const newSeller = new Seller({
      email,
      password,

      birthYear: birthDate, // Usa l'oggetto `Date` convertito
      address,
      username,
      surname,
      role: "seller",
      sellerDetails: {
        shopName,
        shopAddress,
        vatNumber: normalizedVatNumber, // Salva il vatNumber normalizzato
        phone,
        website,
      },
    });

    console.log("New seller object:", newSeller); // Log del nuovo oggetto venditore

    // Salva il nuovo venditore nel database
    await newSeller.save();
    console.log("Seller saved successfully.");

    res.status(201).json({ message: "Seller successfully registered." });
  } catch (err) {
    console.log("Error occurred:", err); // Log dell'errore

    // Gestione errori per duplicati (e.g., email, username, vatNumber già esistenti)
    if (err.code === 11000) {
      console.log("Duplicate error detected.");
      return next({
        type: "validation",
        message: "Email, username, or VAT number already registered.",
      });
    } else {
      next(err); // Passa l'errore al middleware di gestione degli errori
    }
  }
});

*/
/*
seller.post("/seller/create", validateSeller, async (req, res, next) => {
  console.log("Request body:", req.body); // Log del corpo della richiesta
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
      mangaId, // Assicurati che mangaId venga passato correttamente
    } = req.body;

    // Convertire `birthYear` in un oggetto `Date`
    const birthDate = new Date(birthYear);
    console.log("Birth date converted:", birthDate);

    // Verifica che tutti i campi obbligatori siano presenti
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

    // Rimuovi eventuali spazi extra e convertili a minuscolo per evitare problemi di formattazione
    const normalizedVatNumber = vatNumber.trim().toLowerCase();

    // Verifica se il vatNumber è già registrato nel database
    const existingVatNumber = await Seller.findOne({
      "sellerDetails.vatNumber": normalizedVatNumber,
    });

    // Se esiste un venditore con lo stesso vatNumber, ritorna un errore
    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "VAT number is already registered.",
      });
    }

    // Crea un nuovo venditore
    const newSeller = new Seller({
      email,
      password,
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

    // Salva il nuovo venditore nel database
    await newSeller.save();

    // Aggiungi l'ID del manga nel campo `createdManga` se è stato passato
    if (mangaId) {
      console.log("Adding manga ID:", mangaId);

      // Verifica che il manga esista nel database
      const mangaExists = await Manga.findById(mangaId);
      if (!mangaExists) {
        return next({
          type: "validation",
          message: "Manga not found with the provided ID.",
        });
      }

      // Aggiungi l'ID del manga nel campo `createdManga`
      newSeller.createdManga.push(mangaId);

      // Salva il venditore aggiornato
      await newSeller.save();
      console.log("Manga added to seller:", newSeller.createdManga);
    }

    // Rispondi con un messaggio di successo
    res.status(201).json({ message: "Seller successfully registered." });
  } catch (err) {
    console.log("Error occurred:", err);
    next(err); // Passa l'errore al middleware di gestione degli errori
  }
});
*/
/*
seller.post("/seller/create", validateSeller, async (req, res, next) => {
  console.log("Request body:", req.body); // Log del corpo della richiesta
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
      mangaId, // Assicurati che mangaId venga passato correttamente
    } = req.body;

    // Convertire `birthYear` in un oggetto `Date`
    const birthDate = new Date(birthYear);
    console.log("Birth date converted:", birthDate);

    // Verifica che tutti i campi obbligatori siano presenti
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

    // Rimuovi eventuali spazi extra e convertili a minuscolo per evitare problemi di formattazione
    const normalizedVatNumber = vatNumber.trim().toLowerCase();

    // Verifica se il vatNumber è già registrato nel database
    const existingVatNumber = await Seller.findOne({
      "sellerDetails.vatNumber": normalizedVatNumber,
    });

    // Se esiste un venditore con lo stesso vatNumber, ritorna un errore
    if (existingVatNumber) {
      return next({
        type: "validation",
        message: "VAT number is already registered.",
      });
    }

    // Crea un nuovo venditore
    const newSeller = new Seller({
      email,
      password,
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

    // Salva il nuovo venditore nel database
    await newSeller.save();

    // Aggiungi l'ID del manga nel campo `createdManga` se è stato passato
    if (mangaId) {
      console.log("Adding manga ID:", mangaId);

      // Verifica che il manga esista nel database
      const mangaExists = await Manga.findById(mangaId);
      if (!mangaExists) {
        return next({
          type: "validation",
          message: "Manga not found with the provided ID.",
        });
      }

      // Usa il metodo `$push` per aggiornare il campo `createdManga` ed evitare duplicati
      const updatedSeller = await Seller.findByIdAndUpdate(
        newSeller._id,
        { $push: { createdManga: mangaId } },
        { new: true } // Restituisce il documento aggiornato
      );

      console.log("Manga added to seller:", updatedSeller.createdManga);
    }

    // Rispondi con un messaggio di successo, inclusi i dettagli del venditore e del manga (se presente)
    res.status(201).json({
      message: "Seller successfully registered.",
      seller: {
        _id: newSeller._id,
        email: newSeller.email,
        username: newSeller.username,
        createdManga: newSeller.createdManga, // Include l'array dei manga creati
      },
      manga: mangaId ? { _id: mangaId } : null, // Invia anche i dettagli del manga se fornito
    });
  } catch (err) {
    console.log("Error occurred:", err);
    next(err); // Passa l'errore al middleware di gestione degli errori
  }
});
*/
