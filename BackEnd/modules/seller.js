/*const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require("./user"); // Aggiungi se "userSchema" è un altro schema separato

const sellerSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true, // Nome del negozio obbligatorio
    },
    shopAddress: {
      type: String,
      required: true, // Indirizzo del negozio obbligatorio
    },
    vatNumber: {
      type: String,
      required: true, // Partita IVA obbligatoria
      unique: true,
    },
    phone: {
      type: String,
      required: false, // Numero di telefono (opzionale)
    },
    website: {
      type: String,
      required: false, // Sito web (opzionale)
    },

    businessLicense: {
      type: String,
      required: false, // Numero della licenza commerciale (opzionale)
    },
    certifications: [
      {
        name: String, // Nome della certificazione
        dateObtained: Date, // Data di ottenimento
      },
    ],

    preferredLanguage: {
      type: String,
      default: "en", // Lingua preferita (default: inglese)
    },

    paymentMethods: {
      type: [String], // Metodi di pagamento accettati
    },
    bankAccount: {
      accountNumber: String, // Numero conto bancario
      iban: String, // IBAN
      bankName: String, // Nome della banca
    },
    verified: {
      type: Boolean,
      default: false, // Stato di verifica del venditore
    },
  },
  { timestamps: true, strict: true }
);

// Combina i campi base dell'utente con quelli specifici del venditore
const sellerUserSchema = new mongoose.Schema({
  ...userSchema.obj, // Include i campi del modello base
  role: {
    type: String,
    enum: ["seller"], // Solo venditori
    default: "seller",
  },
  sellerDetails: sellerSchema, // Dettagli specifici per il venditore
});

// Hash della password prima di salvare
sellerUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Solo se la password è modificata
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Crittografa la password
    this.password = hashedPassword; // Salva la password criptata
    next(); // Procede con il salvataggio
  } catch (err) {
    next(err); // Gestisce eventuali errori
  }
});

// Metodo per verificare la password
sellerUserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Confronta la password fornita con quella criptata
};

const Seller = mongoose.model("Seller", sellerUserSchema, "seller");
module.exports = Seller;
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const genders = ["male", "female", "other"];
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
      shopName: { type: String, required: true }, // Sposta questi campi dentro sellerDetails
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

// Hash della password prima di salvare
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Solo se la password è modificata
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Crittografa la password
    this.password = hashedPassword; // Salva la password criptata
    next(); // Procede con il salvataggio
  } catch (err) {
    next(err); // Gestisce eventuali errori
  }
});

// Metodo per verificare la password
sellerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Confronta la password fornita con quella criptata
};

const Seller = mongoose.model("Seller", sellerSchema, "seller");
module.exports = Seller;
console.log("Dati inseriti:", Seller);
