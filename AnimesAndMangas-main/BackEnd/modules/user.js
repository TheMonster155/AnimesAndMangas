/*const mongoose = require("mongoose");
const comparePasswordMiddleware = require("../middleware/comparePassword");
const genders = ["male", "female", "other"];

const userSchema = new mongoose.Schema(
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
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: genders,
      required: false,
    },
    birthYear: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, strict: true }
);

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (password) {
  return comparePasswordMiddleware(password, this.password); // Utilizzo del middleware importato
};

module.exports = mongoose.model("dataUser", userSchema, "user");
*/

/*
const mongoose = require("mongoose");
const comparePasswordMiddleware = require("../middleware/comparePassword");
const authenticateToken = require("../middleware/authenticateToken");
const userSchema = new mongoose.Schema(
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
      enum: ["user", "admin"],
      default: "user",
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, strict: true }
);

// Middleware pre-save per hashare la password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("Errore durante l'hashing della password:", err.message);
    next(err);
  }
});

module.exports = mongoose.model("dataUser", userSchema, "user");
*/

/*
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Importa bcrypt
const comparePasswordMiddleware = require("../middleware/comparePassword");

const userSchema = new mongoose.Schema(
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
      enum: ["user", "admin"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, strict: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("Errore durante l'hashing della password:", err.message);
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return comparePasswordMiddleware(password, this.password);
};

module.exports = mongoose.model("dataUser", userSchema, "user");
*/
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
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
      enum: ["user", "admin"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, strict: true }
);

// Hashing della password
userSchema.pre("save", async function (next) {
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
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema, "user");
