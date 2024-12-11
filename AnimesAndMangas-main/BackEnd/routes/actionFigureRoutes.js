//TODO:  funziona con le action , ma bisono provare con gli commenti   bignogna ordinarlo

const express = require("express");
const ActionFigure = require("../modules/actionFigure");
const Comment = require("../modules/comments");
const actionFigure = express.Router();
const cloud = require("./cloudinary");
const Seller = require("../modules/seller");
const authenticateToken = require("../middleware/authenticateToken");
//TODO: qui i comemti funzionamo anche con il dbdata

actionFigure.post(
  "/actionFigure/create",
  authenticateToken,
  cloud.single("file"),
  async (req, res, next) => {
    try {
      // Aggiungi le informazioni del file a req.body se il file è stato caricato
      if (req.file) {
        req.body.file = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      // Crea e salva la nuova action figure
      const actionFigure = new ActionFigure(req.body);
      await actionFigure.save();

      // Aggiungi l'ID dell'Action Figure al campo 'createdManga' del venditore
      const updatedSeller = await Seller.findByIdAndUpdate(
        req.user.userId, // Assicurati che il venditore sia autenticato
        {
          $push: { createdManga: actionFigure._id }, // Aggiungi l'ID dell'Action Figure
        },
        { new: true } // { new: true } per restituire il documento aggiornato
      );

      // Restituisci la risposta con il nuovo oggetto actionFigure e i dati aggiornati del venditore
      res.status(201).json({
        actionFigure,
        updatedSeller, // Puoi includere anche i dati aggiornati del venditore se necessario
      });
    } catch (err) {
      next(err); // Passa l'errore al middleware per la gestione centralizzata
    }
  }
);

// Ottenere tutte le Action Figures
actionFigure.get("/actionFigure", async (req, res, next) => {
  try {
    const actionFigures = await ActionFigure.find().populate("comments");
    res.status(200).json(actionFigures);
  } catch (err) {
    next(err); // Passa l'errore al middleware per la gestione centralizzata
  }
});

// Ottenere una singola Action Figure con commenti
actionFigure.get("/actionFigure/comment/:id", async (req, res, next) => {
  try {
    const actionFigure = await ActionFigure.findById(req.params.id).populate({
      path: "comments",
      populate: { path: "user", select: "username email" }, // Popola anche i dettagli dell'utente
    });
    if (!actionFigure) {
      // Modificato il messaggio di errore
      return res.status(404).json({ error: "Action Figure not found" });
    }
    res.status(200).json(actionFigure);
  } catch (err) {
    next(err); // Passa l'errore al middleware per la gestione centralizzata
  }
});

// Ottenere una Action Figure specifica
actionFigure.get("/actionFigure/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Trova la Action Figure usando l'ID
    const foundActionFigure = await ActionFigure.findById(id).populate(
      "comments"
    );
    if (!foundActionFigure) {
      return res.status(404).json({ error: "Action Figure not found" });
    }

    res.status(200).json(foundActionFigure);
  } catch (err) {
    next(err); // Gestisce gli errori con il middleware
  }
});

// Aggiungere un commento a un'Action Figure
actionFigure.post(
  "/actionFigure/comment/create/:id",
  async (req, res, next) => {
    const { rate, comment, user } = req.body;
    try {
      const actionFigure = await ActionFigure.findById(req.params.id);
      if (!actionFigure) {
        // Modificato il messaggio di errore
        return res.status(404).json({ error: "Action Figure not found" });
      }

      const newComment = new Comment({
        rate,
        comment,
        user,
        actionFigure: actionFigure._id,
      });

      const savedComment = await newComment.save();

      // Aggiorna l'array dei commenti dell'Action Figure
      actionFigure.comments.push(savedComment._id);
      await actionFigure.save();

      res.status(201).json(savedComment);
    } catch (err) {
      next(err); // Passa l'errore al middleware per la gestione centralizzata
    }
  }
);

// Aggiornare un commento specifico di un'Action Figure
actionFigure.patch(
  "/actionFigure/comment/update/:commentId",
  async (req, res, next) => {
    const { rate, comment } = req.body;
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { rate, comment },
        { new: true, runValidators: true }
      );
      if (!updatedComment) {
        // Modificato il messaggio di errore
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(updatedComment);
    } catch (err) {
      next(err); // Passa l'errore al middleware per la gestione centralizzata
    }
  }
);

// Aggiornare una Action Figure
actionFigure.patch("/actionFigure/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Oggetto contenente le modifiche

    // Aggiorna l'Action Figure con le nuove informazioni
    const updatedActionFigure = await ActionFigure.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // `new: true` restituisce il documento aggiornato, `runValidators: true` esegue i validatori definiti nel modello
    );

    if (!updatedActionFigure) {
      return res.status(404).json({ error: "Action Figure not found" });
    }

    res.status(200).json(updatedActionFigure);
  } catch (err) {
    next(err); // Passa l'errore al middleware per la gestione centralizzata
  }
});

// Eliminare un commento da un'Action Figure
actionFigure.delete(
  "/actionFigure/comment/delete/:commentId",
  async (req, res, next) => {
    try {
      const { id, commentId } = req.params;

      // Trova l'Action Figure e rimuovi il commento dal suo array
      const actionFigure = await ActionFigure.findById(id);
      if (!actionFigure) {
        // Modificato il messaggio di errore
        return res.status(404).json({ error: "Action Figure not found" });
      }

      actionFigure.comments = actionFigure.comments.filter(
        (c) => c.toString() !== commentId
      );
      await actionFigure.save();

      // Elimina il commento dal database
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        // Modificato il messaggio di errore
        return res.status(404).json({ error: "Comment not found" });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      next(err); // Passa l'errore al middleware per la gestione centralizzata
    }
  }
);
// Eliminare una Action Figure specifica
actionFigure.delete("/actionFigure/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Elimina la Action Figure
    const deletedActionFigure = await ActionFigure.findByIdAndDelete(id);
    if (!deletedActionFigure) {
      return res.status(404).json({ error: "Action Figure not found" });
    }

    res.status(200).json({ message: "Action Figure deleted successfully" });
  } catch (err) {
    next(err); // Gestisce gli errori con il middleware
  }
});

module.exports = actionFigure;
