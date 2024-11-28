const express = require("express");
const ActionFigure = require("../modules/actionFigure");
const validationErrorMiddleware = require("../middleware/validationErrorMiddleware");

const router = express.Router();

// Rotta per aggiungere un action figure
router.post("/", async (req, res, next) => {
  try {
    const actionFigure = new ActionFigure(req.body);
    await actionFigure.save();
    res.status(201).json(actionFigure);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});

// Rotta GET generale (tutte le action figure)
router.get("/", async (req, res, next) => {
  try {
    const actionFigures = await ActionFigure.find();
    res.status(200).json(actionFigures);
  } catch (err) {
    next(err);
  }
});

// Rotta GET per ottenere solo i nomi delle action figure
router.get("/names", async (req, res, next) => {
  try {
    const names = await ActionFigure.find().select("name -_id");
    res.status(200).json(names);
  } catch (err) {
    next(err);
  }
});

// Rotta GET per ottenere una action figure specifica tramite ID
router.get("/:id", async (req, res, next) => {
  try {
    const actionFigure = await ActionFigure.findById(req.params.id);
    if (!actionFigure) {
      return res.status(404).json({ error: "Action Figure non trovata" });
    }
    res.status(200).json(actionFigure);
  } catch (err) {
    next(err);
  }
});

// Rotta PATCH per aggiornare una action figure tramite ID
router.patch("/:id", async (req, res, next) => {
  try {
    const actionFigure = await ActionFigure.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actionFigure) {
      return res.status(404).json({ error: "Action Figure non trovata" });
    }
    res.status(200).json(actionFigure);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});

// Rotta DELETE per eliminare una action figure tramite ID
router.delete("/:id", async (req, res, next) => {
  try {
    const actionFigure = await ActionFigure.findByIdAndDelete(req.params.id);
    if (!actionFigure) {
      return res.status(404).json({ error: "Action Figure non trovata" });
    }
    res.status(200).json({ message: "Action Figure eliminata con successo" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

//modificare il modulo, name deve diventare titles anche nei manga, poi controllaare la get e cambiare name e diventare titles
// aggiungere il cliente nei login 
