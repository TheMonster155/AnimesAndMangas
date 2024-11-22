const mongoose = require("mongoose");

const mangaGenres = [
  "Shonen",
  "Shojo",
  "Seinen",
  "Josei",
  "Kodomo",
  "Mecha",
  "Isekai",
  "Fantasy",
  "Slice of Life",
  "Horror",
  "Sport",
  "Comedy",
];

const mangaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  publisher: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  genres: [{ type: String, enum: mangaGenres, required: true }],
  language: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  releaseDate: { type: Date, required: true },
  photoUrl: { type: String, required: true }, // URL di Cloudinary
}, { timestamps: true });

module.exports = mongoose.model("Manga", mangaSchema,"manga");
