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
      ref: "User",
      required: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: [
      {
        manga: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Manga",
          required: false,
        },
      },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");
