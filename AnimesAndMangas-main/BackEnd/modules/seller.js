/*const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const genders = ["male", "female", "other"];

//TODO:  fare usare il trim + che lui capisca le maiuscole e minuscole + pass che abbia in minimo 8 e lui deve avere almeno una maiuscole e un caraterre

const sellerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    gender: {
      type: String,
      enum: genders,
      required: true,
    },
    birthYear: {
      type: Number,
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
      preferredLanguage: { type: String, default: "en" },
      paymentMethods: [String],
      bankAccount: {
        accountNumber: String,
        iban: String,
        bankName: String,
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: true }
);

// Hash della password
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

sellerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Seller = mongoose.model("Seller", sellerSchema, "seller");
module.exports = Seller;
*/
/*
const mongoose = require("mongoose");

const comparePasswordMiddleware = require("../middleware/comparePassword");

const genders = ["male", "female", "other"];
const bcrypt = require("bcrypt");
const sellerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

sellerSchema.methods.comparePassword = async function (password) {
  return comparePasswordMiddleware(password, this.password);

};

sellerSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("Seller", sellerSchema, "seller");
*/
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
