
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Aggiungo una costante per i generi
const genders = ['male', 'female', 'other'];

const userSchema = new mongoose.Schema({
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
    enum: ['normal', 'admin'],
    default: 'normal',
  },
  gender: {
    type: String,
    enum: genders,
    required: true, // Il genere è obbligatorio
  },
  birthYear: {
    type: Number,
    required: true, // L'anno di nascita è obbligatorio
  },
  address: {
    type: String,
    required: true, // L'indirizzo è obbligatorio
  },
  username: {
    type: String,
    required: true, // Lo username è obbligatorio
    unique: true,
  },
  surname: {
    type: String,
    required: true, // Il cognome è obbligatorio
  },
}, { timestamps: true });

// Verifica se l'utente è maggiorenne
userSchema.pre('save', function(next) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - this.birthYear;

  if (age < 18) {
    return next(new Error('L\'utente deve essere maggiorenne per registrarsi.'));
  }

  next();
});

// Hash della password prima di salvare
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Metodo per verificare la password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'user');
