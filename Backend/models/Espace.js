const mongoose = require('mongoose');

const espaceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['salle', 'bureau', 'coworking', 'Amphi', 'hotel'],
    required: true
  },
  capacite: {
    type: Number,
    required: true
  },
  localisation: {
    type: String,
    required: true
  },
  disponibilite: {
    type: Boolean,
    default: true
  },
  prixParHeure: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Espace', espaceSchema);
