const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  espace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Espace',
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['confirmée', 'annulée'],
    default: 'confirmée'
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
