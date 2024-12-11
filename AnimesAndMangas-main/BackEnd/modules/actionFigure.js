const mongoose = require("mongoose");

const actionFigureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    availability: { type: Number, default: 100 }, // default 100
    file: { type: Object, required: false }, // URL di Cloudinary
    description: { type: String, required: false, trim: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }], // ID del venditore
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model(
  "ActionFigure",
  actionFigureSchema,
  "actionFigure"
);
