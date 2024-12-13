const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller"],
      default: "seller",
    },
    birthYear: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    surname: {
      type: String,
      required: true,
    },
    sellerDetails: {
      shopName: { type: String, required: true },
      shopAddress: { type: String, required: true },
      vatNumber: { type: String, required: true, unique: true },
      phone: String,
      website: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    createdManga: [{ type: mongoose.Schema.Types.ObjectId, ref: "Manga" }],
    createActionFigure: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ActionFigure" },
    ],
  },
  { timestamps: true, strict: true }
);

// Hashing della password
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Metodo per confrontare le password
sellerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema, "seller");
