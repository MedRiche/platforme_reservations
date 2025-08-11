const Reservation = require('../models/Reservation');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('utilisateur', 'nom email')
      .populate('espace', 'nom type localisation');
    res.json(reservations);
  } catch (err) {
    console.error('Erreur lors de la récupération des réservations:', err);
    res.status(500).json({ message: "Erreur lors du chargement des réservations." });
  }
};
