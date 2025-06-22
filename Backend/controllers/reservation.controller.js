const Reservation = require('../models/Reservation');
const { sendReservationMail, sendAnnulationMail } = require('../utils/mailer');
const User = require('../models/User');
const Espace = require('../models/Espace');

exports.createReservation = async (req, res) => {
  try {
    const { espace, dateDebut, dateFin } = req.body;
    const utilisateur = req.user.id;

    // Vérifier conflits
    const conflits = await Reservation.findOne({
      espace,
      statut: 'confirmée',
      $or: [
        {
          dateDebut: { $lt: dateFin },
          dateFin: { $gt: dateDebut }
        }
      ]
    });

    if (conflits) {
      return res.status(400).json({ message: 'Créneau déjà réservé pour cet espace.' });
    }

    const nouvelleReservation = new Reservation({
      utilisateur,
      espace,
      dateDebut,
      dateFin
    });

    await nouvelleReservation.save();

    // Envoi d’e-mail de confirmation
    const user = await User.findById(utilisateur);
    const espaceInfo = await Espace.findById(espace);

    await sendReservationMail(
      user.email,
      espaceInfo.nom,
      dateDebut,
      dateFin
    );

    res.status(201).json(nouvelleReservation);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ utilisateur: req.user.id }).populate('espace');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });

    // Vérifie si c’est le bon utilisateur
    if (reservation.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    reservation.statut = 'annulée';
    await reservation.save();

    // Envoi d’e-mail d’annulation
    const user = await User.findById(req.user.id);
    const espaceInfo = await Espace.findById(reservation.espace);

    await sendAnnulationMail(
      user.email,
      espaceInfo.nom,
      reservation.dateDebut,
      reservation.dateFin
    );

    res.json({ message: 'Réservation annulée' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
