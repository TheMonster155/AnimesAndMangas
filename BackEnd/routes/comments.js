/*const express = require("express");
const Comment = require("../modules/comments");
const Manga = require("../modules/manga");
const ActionFigure = require("../modules/actionFigure");
const authenticateToken = require("../middleware/authenticateToken");
const comment = express.Router();

// Importa il middleware personalizzato per i commenti
const authorizeCommentAction = require("../middleware/authorizeCommentAction");

// GET: Ottieni tutti i commenti (solo per utenti autenticati)
comment.get("/comment", authenticateToken, async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username email")
      .populate("seller", "username email")
      .populate("manga", "name publisher")
      .populate("actionFigure", "name price");
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

// POST: Crea un commento (user o seller autenticato)
comment.post("/comment/create", authenticateToken, async (req, res, next) => {
  const { rate, comment: commentText, manga, actionFigure } = req.body;

  const { role, userId } = req.user;

  if (!manga && !actionFigure) {
    return res.status(400).json({ error: "Manga or ActionFigure is required" });
  }

  if (role === "seller" && !actionFigure) {
    return res
      .status(403)
      .json({ error: "Sellers can only comment on their own products" });
  }

  try {
    const newComment = new Comment({
      rate,
      comment: commentText,
      user: role === "user" ? userId : undefined,
      seller: role === "seller" ? userId : undefined,
      manga,
      actionFigure,
    });

    const savedComment = await newComment.save();

    if (manga) {
      await Manga.findByIdAndUpdate(manga, {
        $push: { comments: savedComment._id },
      });
    } else if (actionFigure) {
      await ActionFigure.findByIdAndUpdate(actionFigure, {
        $push: { comments: savedComment._id },
      });
    }

    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
});

// PATCH: Aggiorna un commento
comment.patch(
  "/comment/update/:id",
  authenticateToken,
  authorizeCommentAction,
  async (req, res, next) => {
    const { rate, comment: commentText } = req.body;
    const { id } = req.params;

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { rate, comment: commentText },
        { new: true }
      )
        .populate("user", "username email")
        .populate("seller", "username email")
        .populate("manga", "name publisher")
        .populate("actionFigure", "name price");

      if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.status(200).json(updatedComment);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE: Elimina un commento
comment.delete(
  "/comment/delete/:id",
  authenticateToken,
  authorizeCommentAction,
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (deletedComment.manga) {
        await Manga.findByIdAndUpdate(deletedComment.manga, {
          $pull: { comments: id },
        });
      }
      if (deletedComment.actionFigure) {
        await ActionFigure.findByIdAndUpdate(deletedComment.actionFigure, {
          $pull: { comments: id },
        });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = comment;

/*const express = require("express");
const Comment = require("../modules/comments"); // Modello Comment
const Manga = require("../modules/manga"); // Modello Manga
const ActionFigure = require("../modules/actionFigure"); // Modello ActionFigure
const comment = express.Router();

// Funzione per recuperare i commenti per manga o action figure
async function getCommentsByProductId(id) {
  return await Comment.find({
    $or: [{ manga: id }, { actionFigure: id }],
  })
    .populate("user", "username email")
    .populate("seller", "username email")
    .populate("manga", "name publisher")
    .populate("actionFigure", "name price");
}

// GET per ottenere tutti i commenti
comment.get("/comment", async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username email")
      .populate("seller", "username email")
      .populate("manga", "name publisher")
      .populate("actionFigure", "name price");
    res.status(200).json(comments);
  } catch (err) {
    next(err); // Passa l'errore al middleware di gestione
  }
});

// GET per ottenere i commenti di un prodotto specifico (manga o action figure)
comment.get("/comment/product/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // Verifica l'esistenza del prodotto
    const manga = await Manga.findById(id);
    const actionFigure = await ActionFigure.findById(id);

    if (!manga && !actionFigure) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comments = await getCommentsByProductId(id);
    res.status(200).json(comments);
  } catch (err) {
    next(err); // Passa l'errore al middleware di gestione
  }
});

// POST per creare un nuovo commento
comment.post("/comment/create", async (req, res, next) => {
  const {
    rate,
    comment: commentText,
    user,
    seller,
    manga,
    actionFigure,
  } = req.body;

  // Verifica se il prodotto (manga o actionFigure) è presente
  if (!manga && !actionFigure) {
    return res.status(400).json({
      message:
        "At least one of manga or actionFigure is required to create a comment",
    });
  }

  try {
    // Crea il nuovo commento
    const newComment = new Comment({
      rate,
      comment: commentText,
      user,
      seller,
      manga,
      actionFigure,
    });

    // Salva il commento
    const savedComment = await newComment.save();

    // Aggiungi il commento all'array dei commenti del manga o actionFigure
    if (manga) {
      await Manga.findByIdAndUpdate(manga, {
        $push: { comments: savedComment._id },
      });
    } else if (actionFigure) {
      await ActionFigure.findByIdAndUpdate(actionFigure, {
        $push: { comments: savedComment._id },
      });
    }

    res.status(201).json(savedComment);
  } catch (err) {
    next(err); // Passa l'errore al middleware per la gestione
  }
});

// GET per ottenere un commento specifico
comment.get("/comments/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const commentData = await Comment.findById(id).populate(
      "user manga actionFigure"
    );
    if (!commentData) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json(commentData);
  } catch (error) {
    next(error); // Passa l'errore al middleware di gestione
  }
});

// PATCH per aggiornare un commento
comment.patch("/comment/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rate, comment: commentText } = req.body;

  try {
    // Prepara i campi da aggiornare dinamicamente
    const updates = {};
    if (rate) updates.rate = rate;
    if (commentText) updates.comment = commentText;

    const updatedComment = await Comment.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("user", "username email")
      .populate("seller", "username email")
      .populate("manga", "name publisher")
      .populate("actionFigure", "name price");

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err); // Passa l'errore al middleware per la gestione
  }
});

// DELETE per eliminare un commento
comment.delete("/comment/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Rimuove il commento da manga o action figure, se presente
    if (deletedComment.manga) {
      await Manga.findByIdAndUpdate(deletedComment.manga, {
        $pull: { comments: id },
      }).catch((err) =>
        console.error("Error removing comment from manga:", err)
      );
    }
    if (deletedComment.actionFigure) {
      await ActionFigure.findByIdAndUpdate(deletedComment.actionFigure, {
        $pull: { comments: id },
      }).catch((err) =>
        console.error("Error removing comment from actionFigure:", err)
      );
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err); // Passa l'errore al middleware per la gestione
  }
});

// Middleware per la gestione degli errori
comment.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

module.exports = comment;
*/
