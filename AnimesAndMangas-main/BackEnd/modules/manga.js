const mongoose = require("mongoose");

const mangaCategories = ["Shonen", "Shojo", "Seinen", "Josei", "Kodomo"];

const mangaGenres = [
  "Action",
  "Adventure",
  "Fantasy",
  "Isekai",
  "Drama",
  "Romance",
  "Comedy",
  "Slice of Life",
  "Horror",
  "Mystery",
  "Sci-Fi",
  "Mecha",
  "Sport",
  "Historical",
  "Supernatural",
  "Psychological",
  "Thriller",
  "Martial Arts",
  "School",
  "Music",
  "Game",
];

const mangaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    publisher: { type: String, required: false, trim: true },
    author: { type: String, required: false, trim: true },
    type: { type: String, require: false },
    category: {
      type: String,
      required: false,
      enum: mangaCategories,
      trim: true,
    },
    genres: [
      {
        type: String,
        enum: mangaGenres,
        required: false,
        trim: true,
      },
    ],
    language: { type: String, required: false, trim: true },
    price: { type: Number, required: true },
    availability: { type: Number, default: 100 }, // default 100
    releaseDate: { type: Date, required: false },

    file: { type: Object, required: false },
    description: { type: String, required: false, trim: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }], // ID del venditore
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("Manga", mangaSchema, "manga");
