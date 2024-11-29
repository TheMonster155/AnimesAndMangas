const express = require("express");
const Manga = require("../modules/manga");
const validationErrorMiddleware = require("../middleware/validationErrorMiddleware");
const cloud = require("./cloudinary");

const manga = express.Router(); //cambiare
// post aggiungere il nome
// Rotta per aggiungere un manga

/*
manga.post("/manga/create", async (req, res, next) => {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    res.status(201).json(manga);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});*/
/*
manga.post("/manga/create", cloud.single("file"), async (req, res, next) => {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    res.status(201).json({
      message: "File uploaded successfully",
      file: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});
*/
manga.post("/manga/create", cloud.single("file"), async (req, res, next) => {
  try {
    console.log("File ricevuto:", req.file); // Logga req.file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Body ricevuto:", req.body); // Logga req.body
    res.status(200).json({ message: "File elaborato con successo" });
  } catch (error) {
    console.error("Errore:", error); // Log dell'errore
    next(error);
  }
});

// Rotta GET generale (tutti i manga)
manga.get("/manga", async (req, res, next) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (err) {
    next(err);
  }
});

// Rotta GET per ottenere solo i titoli dei manga
manga.get("/manga/titles", async (req, res, next) => {
  try {
    const titles = await Manga.find().select("name -_id");
    res.status(200).json(titles);
  } catch (err) {
    next(err);
  }
});

// Rotta GET per ottenere un manga specifico tramite ID
manga.get("/manga/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) {
      return res.status(404).json({ error: "Manga non trovato" });
    }
    res.status(200).json(manga);
  } catch (err) {
    next(err);
  }
});

// Rotta PATCH per aggiornare un manga tramite ID
manga.patch("/manga/update//:id", async (req, res, next) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!manga) {
      return res.status(404).json({ error: "Manga non trovato" });
    }
    res.status(200).json(manga);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});

// Rotta DELETE per eliminare un manga tramite ID
manga.delete("manga/delete/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findByIdAndDelete(req.params.id);
    if (!manga) {
      return res.status(404).json({ error: "Manga non trovato" });
    }
    res.status(200).json({ message: "Manga eliminato con successo" });
  } catch (err) {
    next(err);
  }
});

module.exports = manga;

/*
manga.post("/manga", cloud.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(201).json({
      message: "File uploaded successfully",
      file: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });
  } catch (error) {
    next(error);
  }
});*/
