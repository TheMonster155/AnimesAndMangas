/*const express = require("express");
const Comment = require("../modules/comments");
const Manga = require("../modules/manga");
const ActionFigure = require("../modules/actionFigure");
const authenticateToken = require("../middleware/authenticateToken");
const dataUser = require("../modules/user");
const Seller = require("../modules/seller");

const comments = express.Router();

// GET: Recupera tutte le recensioni (sia per manga che action figures)
comments.get("/comments", async (req, res, next) => {
  try {
    const allReviews = await Comment.find().populate("user");

    if (allReviews.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No reviews found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Reviews retrieved successfully",
      reviews: allReviews,
    });
  } catch (error) {
    next(error);
  }
});

comments.get("/comments/product/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    // Verifica se il productId è un manga o un'azione figure
    const reviewsForProduct = await Comment.find({
      $or: [
        { manga: productId }, // Se è un manga
        { actionFigure: productId }, // Se è un'azione figure
      ],
    }).populate("user");

    if (reviewsForProduct.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No reviews found for this product",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Reviews retrieved successfully",
      reviews: reviewsForProduct,
    });
  } catch (error) {
    next(error);
  }
});

// POST: Crea una nuova recensione
comments.post("/comments/create", async (req, res, next) => {
  const { rate, comment, productType: productId, user: userId } = req.body; // Supponiamo che `productType` sia 'manga' o 'actionFigure'

  if (!rate || !comment || !productId || !productType) {
    return res.status(400).send({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  try {
    // Ottieni l'utente con il suo ID
    const user = await dataUser.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Trova il prodotto a cui fare riferimento (Manga o ActionFigure)
    let product;
    if (productType === "manga") {
      product = await Manga.findOne({ _id: productId });
    } else if (productType === "actionFigure") {
      product = await ActionFigure.findOne({ _id: productId });
    }

    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "Product not found",
      });
    }

    // Crea un nuovo commento
    const newComment = new Comment({
      rate,
      comment,
      user: user._id, // Usa l'ID dell'utente trovato
      [productType]: product._id, // Aggiungi l'ID del prodotto trovato (manga o actionFigure)
    });

    // Salva il commento nel database
    await newComment.save();

    // Aggiungi il commento al prodotto e all'utente
    if (productType === "manga") {
      product.comments.push(newComment._id);
      await product.save();
    } else if (productType === "actionFigure") {
      product.comments.push(newComment._id);
      await product.save();
    }

    user.comments.push(newComment._id);
    await user.save();

    res.status(201).send({
      statusCode: 201,
      message: "Review added successfully",
      review: newComment,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE: Elimina una recensione per prodotto
comments.delete("/comments/delete/:commentId", async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const commentToDelete = await Comment.findByIdAndDelete(commentId);

    if (!commentToDelete) {
      return res.status(404).send({
        statusCode: 404,
        message: "Review not found for this product",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

// PATCH: Modifica una recensione per prodotto
comments.patch("/comments/update/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  if (!commentId) {
    return (404).send({
      statusCode: 400,
      message: "commentID is require ",
    });
  }
  try {
    const commentExist = await Comment.findById(commentId);

    if (!commentExist) {
      return res.status(404).send({
        statusCode: 404,
        message: "Review not found for this product",
      });
    }
    const updateComment = req.body;
    const options = { new: true };
    const result = await Comment.findByIdAndUpdate(
      commentId,
      updateComment,
      options
    );

    res.status(200).send({
      statusCode: 200,
      message: "Review updated successfully",
      review: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = comments;
*/

const express = require("express");
const Comment = require("../modules/comments");
const Manga = require("../modules/manga");
const ActionFigure = require("../modules/actionFigure");
const authenticateToken = require("../middleware/authenticateToken");
const dataUser = require("../modules/user");
const Seller = require("../modules/seller");

const comments = express.Router();

// GET: Recupera tutte le recensioni (sia per manga che action figures)
comments.get("/comments", async (req, res, next) => {
  try {
    const allReviews = await Comment.find()
      .populate("user")
      .populate("productType.manga")
      .populate("productType.actionFigure");

    if (allReviews.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No reviews found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Reviews retrieved successfully",
      reviews: allReviews,
    });
  } catch (error) {
    next(error);
  }
});

// GET: Recupera recensioni per un prodotto specifico (sia manga che action figures)
comments.get("/comments/product/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const reviewsForProduct = await Comment.find({
      $or: [
        { "productType.manga": productId }, // Se è un manga
        { "productType.actionFigure": productId }, // Se è un'azione figure
      ],
    })
      .populate("user")
      .populate("productType.manga")
      .populate("productType.actionFigure");

    if (reviewsForProduct.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No reviews found for this product",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Reviews retrieved successfully",
      reviews: reviewsForProduct,
    });
  } catch (error) {
    next(error);
  }
});

comments.post("/comments/create", async (req, res, next) => {
  const { rate, comment, productType, user } = req.body;

  // Verifica che i campi richiesti siano presenti
  if (!rate || !comment || !productType || !user) {
    return res.status(400).send({
      statusCode: 400,
      message: "Missing required fields (rate, comment, productType, user)",
    });
  }

  try {
    // Trova l'utente
    const userData = await dataUser.findById(user);
    if (!userData) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Trova il prodotto (Manga o ActionFigure)
    let product;
    product = await Manga.findById(productType); // Prima cerca tra i manga
    if (!product) {
      // Se non è un manga, cerca tra le action figures
      product = await ActionFigure.findById(productType);
    }

    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "Product not found",
      });
    }

    // Crea il commento
    const newComment = new Comment({
      rate,
      comment,
      user: userData._id,
      productType: {
        [product.constructor.modelName.toLowerCase()]: product._id, // Usa il tipo di modello (Manga o ActionFigure)
      },
    });

    // Salva il commento
    await newComment.save();

    // Aggiungi il commento al prodotto
    product.comments.push(newComment._id);
    await product.save();

    // Aggiungi il commento all'utente
    userData.comments.push(newComment._id);
    await userData.save();

    res.status(201).send({
      statusCode: 201,
      message: "Review added successfully",
      review: newComment,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE: Elimina una recensione per prodotto
comments.delete("/comments/delete/:commentId", async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const commentToDelete = await Comment.findByIdAndDelete(commentId);

    if (!commentToDelete) {
      return res.status(404).send({
        statusCode: 404,
        message: "Review not found for this product",
      });
    }

    // Rimuovere il commento dai prodotti associati
    const products = [
      ...(await Manga.find({ comments: commentId })),
      ...(await ActionFigure.find({ comments: commentId })),
    ];

    products.forEach(async (product) => {
      product.comments = product.comments.filter(
        (comment) => comment.toString() !== commentId
      );
      await product.save();
    });

    res.status(200).send({
      statusCode: 200,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

// PATCH: Modifica una recensione per prodotto
comments.patch("/comments/update/:commentId", async (req, res, next) => {
  const { commentId } = req.params;

  if (!commentId) {
    return res.status(400).send({
      statusCode: 400,
      message: "commentId is required",
    });
  }

  try {
    const commentExist = await Comment.findById(commentId);

    if (!commentExist) {
      return res.status(404).send({
        statusCode: 404,
        message: "Review not found for this product",
      });
    }

    const updateComment = req.body;
    const options = { new: true };
    const result = await Comment.findByIdAndUpdate(
      commentId,
      updateComment,
      options
    );

    res.status(200).send({
      statusCode: 200,
      message: "Review updated successfully",
      review: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = comments;
