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
        $regex: name,
        $options: "i",
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
      manga,
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
    const { type } = req.params;
    const mangas = await Manga.find({ type: type });

    if (mangas.length === 0) {
      const error = new Error("No manga found for this type");
      error.status = 404;
      return next(error);
    }

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
    const manga = await Manga.findById(req.params.id).populate("comments");
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
