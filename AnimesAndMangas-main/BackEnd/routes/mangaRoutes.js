const express = require("express");
const Manga = require("../modules/manga");
const validationErrorMiddleware = require("../middleware/validationErrorMiddleware");
const cloud = require("./cloudinary");

const manga = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const authorizeAdminOrSeller = require("../middleware/authorizeAdminOrSeller");
const Seller = require("../modules/seller"); // Assicurati di importare Seller

manga.post(
  "/manga/create",
  [authenticateToken, authorizeAdminOrSeller],
  cloud.single("file"),
  async (req, res, next) => {
    try {
      console.log("req.body:", req.body);
      console.log("User ID in request:", req.user.userId);

      req.body.seller = req.user.userId;

      if (req.file) {
        req.body.file = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      // Crea il manga
      const manga = new Manga(req.body);
      await manga.save();

      // Verifica che il venditore esista prima di aggiornarlo
      const seller = await Seller.findById(req.user.userId);
      if (!seller) {
        return res.status(404).json({ error: "Seller not found" });
      }

      // Aggiungi il manga al campo 'createdManga' del venditore
      const updatedSeller = await Seller.findByIdAndUpdate(
        req.user.userId,
        {
          $push: { createdManga: manga._id }, // Aggiungi l'ID del manga
        },
        { new: true }
      ); // { new: true } per restituire il documento aggiornato

      console.log("Updated Seller:", updatedSeller);

      // Rispondi con successo
      res.status(201).json({
        message: "File uploaded and manga created successfully",
        file: req.body.file,
        manga: manga,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        err.type = "validation";
      }
      next(err);
    }
  }
);

manga.get("/products", async (req, res, next) => {
  const { page = 1, pageSize = 8 } = req.query;
  try {
    const manga = await Manga.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const count = await Manga.countDocuments();
    const totalPages = Math.ceil(count / pageSize);

    if (!manga) {
      return res.status(404).send({
        statusCode: 404,
        message: "Products not Found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: ` Products Found: ${manga.length}`,
      count,
      totalPages,
      manga,
    });
  } catch (error) {
    next(error);
  }
});

manga.get("/manga/title/:name", async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({
      statusCode: 400,
      message: "Title is required",
    });
  }

  try {
    const manga = await Manga.find({
      name: {
        $regex: name, // Cerca il titolo parziale
        $options: "i", // Case-insensitive
      },
    });

    if (!manga || manga.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Title not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Manga Found: ${manga.length}`,
      manga, // Ritorna un array di prodotti corrispondenti
    });
  } catch (error) {
    console.error("Error while searching manga:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

manga.get("/manga", async (req, res, next) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (err) {
    next(err);
  }
});
manga.get("/manga/:type", async (req, res, next) => {
  try {
    const { type } = req.params; // Ottieni il tipo dalla richiesta (ad esempio "Figure")
    const mangas = await Manga.find({ type: type }); // Filtra per tipo

    if (mangas.length === 0) {
      const error = new Error("No manga found for this type");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(mangas); // Restituisce i manga trovati
  } catch (err) {
    next(err); // Gestisce gli errori
  }
});
manga.get("/manga/titles", async (req, res, next) => {
  try {
    const titles = await Manga.find().select("name -_id");
    res.status(200).json(titles);
  } catch (err) {
    next(err);
  }
});

manga.patch("/manga/update/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!manga) {
      const error = new Error("Manga not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(manga);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});

manga.delete("/manga/delete/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findByIdAndDelete(req.params.id);
    if (!manga) {
      const error = new Error("Manga not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Manga deleted successfully" });
  } catch (err) {
    next(err);
  }
});

manga.get("/manga/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findById(req.params.id).populate("comments"); // Popola i commenti
    if (!manga) {
      const error = new Error("Manga not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(manga);
  } catch (err) {
    next(err);
  }
});

module.exports = manga;

/*


// GET per ottenere un singolo manga con i commenti popolati
manga.get("/manga/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findById(req.params.id).populate("comments"); // Popola i commenti
    if (!manga) {
      // Errore se il manga non esiste
      const error = new Error("Manga not found");
      error.status = 404; // Imposta lo status a 404
      return next(error);
    }
    res.status(200).json(manga); // Restituisce il manga con i commenti
  } catch (err) {
    next(err);
  }
});

// POST per aggiungere un commento a un manga
manga.post("/manga/comment/:id", async (req, res, next) => {
  const { rate, comment, user } = req.body;
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) {
      return res.status(404).json({ error: "Manga not found" });
    }

    // Crea un nuovo commento
    const newComment = new Comment({
      rate,
      comment,
      user,
      manga: manga._id,
    });

    // Salva il commento
    const savedComment = await newComment.save();

    // Aggiungi il commento al manga
    manga.comments.push(savedComment._id);
    await manga.save();

    res.status(201).json(savedComment); // Restituisce il commento appena creato
  } catch (err) {
    next(err);
  }
});

// PATCH per aggiornare un commento di un manga
manga.patch("/manga/:mangaId/comment/:commentId", async (req, res, next) => {
  const { rate, comment } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { rate, comment },
      { new: true, runValidators: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment); // Restituisce il commento aggiornato
  } catch (err) {
    next(err);
  }
});

// DELETE per eliminare un commento di un manga
manga.delete("/manga/:mangaId/comment/:commentId", async (req, res, next) => {
  try {
    const manga = await Manga.findById(req.params.mangaId);
    if (!manga) {
      return res.status(404).json({ error: "Manga not found" });
    }

    // Rimuove il commento dal manga
    manga.comments = manga.comments.filter(
      (c) => c.toString() !== req.params.commentId
    );
    await manga.save();

    // Elimina il commento
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});

*/

/*
vecchio


const express = require("express");
const Manga = require("../modules/manga");

;
const cloud = require("./cloudinary");

const manga = express.Router();

manga.post("/manga/create", cloud.single("file"), async (req, res, next) => {
  try {
    console.log("req.body:", req.body);

    // Aggiungi le informazioni del file caricato a req.body
    if (req.file) {
      req.body.file = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const manga = new Manga(req.body);
    await manga.save();

    res.status(201).json({
      message: "File uploaded successfully",
      file: req.body.file, // Restituisci i dati del file
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.type = "validation";
    }
    next(err);
  }
});

manga.get("/manga", async (req, res, next) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (err) {
    next(err);
  }
});

manga.get("/manga/titles", async (req, res, next) => {
  try {
    const titles = await Manga.find().select("name -_id");
    res.status(200).json(titles);
  } catch (err) {
    next(err);
  }
});

manga.get("/manga/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findById(req.params.id).populate("comments"); // Popola i commenti
    if (!manga) {
      return res.status(404).json({ error: "Manga non trovato" });
    }
    res.status(200).json(manga); // Restituisce manga con i commenti popolati
  } catch (err) {
    next(err);
  }
});

manga.patch("/manga/update/:id", async (req, res, next) => {
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
//TODO: cambiare tutte gli avvisi da ita in eng
manga.delete("/manga/delete/:id", async (req, res, next) => {
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

*/

/*
manga.post("/manga/create", cloud.single("file"), async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
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
