const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Riferimento al modello degli utenti
      required: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // Riferimento al modello dei venditori
      required: false, // Cambiato a opzionale
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Riferimento al modello degli utenti con ruolo admin
    },
    productType: [
      {
        manga: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Manga", // Riferimento al modello Manga
          required: false, // Per supportare anche i commenti su action figures
        },
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");
