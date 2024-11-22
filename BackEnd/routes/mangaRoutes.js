const express = require("express");
const Manga = require("../modules/manga");
const validationErrorMiddleware = require("../middleware/validationErrorMiddleware");

const router = express.Router();

// Rotta per aggiungere un manga
router.post("/", async (req, res, next) => {
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
});

// Rotta GET generale (tutti i manga)
router.get("/", async (req, res, next) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (err) {
    next(err);
  }
});

// Rotta GET per ottenere solo i titoli dei manga
router.get("/titles", async (req, res, next) => {
  try {
    const titles = await Manga.find().select("name -_id");
    res.status(200).json(titles);
  } catch (err) {
    next(err);
  }
});

// Rotta GET per ottenere un manga specifico tramite ID
router.get("/:id", async (req, res, next) => {
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
router.patch("/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
router.delete("/:id", async (req, res, next) => {
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

module.exports = router;
