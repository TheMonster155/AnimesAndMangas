const express = require("express");
const Comment = require("../modules/comments");
const Manga = require("../modules/manga");

const authenticateToken = require("../middleware/authenticateToken");
const dataUser = require("../modules/user");

const comments = express.Router();

comments.get("/comments", async (req, res, next) => {
  try {
    const allReviews = await Comment.find()
      .populate("user")
      .populate("productType.manga");

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
    const reviewsForProduct = await Comment.find({
      "productType.manga": productId,
    })
      .populate("user")
      .populate("productType.manga");

    if (reviewsForProduct.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No reviews found for this manga",
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
    const userData = await dataUser.findById(user);
    if (!userData) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    const product = await Manga.findById(productType);
    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "Manga product not found",
      });
    }

    const newComment = new Comment({
      rate,
      comment,
      user: userData._id,
      productType: {
        manga: product._id,
      },
    });

    await newComment.save();

    product.comments.push(newComment._id);
    await product.save();

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

comments.delete("/comments/delete/:commentId", async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const commentToDelete = await Comment.findByIdAndDelete(commentId);

    if (!commentToDelete) {
      return res.status(404).send({
        statusCode: 404,
        message: "Review not found for this manga",
      });
    }

    const product = await Manga.findOne({ comments: commentId });

    if (product) {
      product.comments = product.comments.filter(
        (comment) => comment.toString() !== commentId
      );
      await product.save();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

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
