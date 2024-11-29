const mongoose = require("mongoose");

const actionFigureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    photoUrl: { type: String, required: true }, // URL di Cloudinary
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model(
  "ActionFigure",
  actionFigureSchema,
  "actionFigure"
);
