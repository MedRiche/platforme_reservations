const Reservation = require('../models/Reservation');
const { sendReservationMail } = require('../utils/mailer');
const User = require('../models/User');
const Espace = require('../models/Espace');
const { sendAnnulationMail } = require('../utils/mailer');

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
    console.log('Demande d’annulation reçue');

    const reservation = await Reservation.findById(req.params.id)
      .populate('utilisateur')
      .populate('espace');

    if (!reservation) {
      console.log('Réservation introuvable');
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (reservation.utilisateur._id.toString() !== req.user.id) {
      console.log('Utilisateur non autorisé');
      return res.status(403).json({ message: 'Non autorisé' });
    }

    // Marquer comme annulée (ne pas supprimer pour garder un historique)
    reservation.statut = 'annulée';
    await reservation.save();

    // Envoi de l’e-mail
    console.log('Envoi mail à :', reservation.utilisateur.email);
    await sendAnnulationMail(
      reservation.utilisateur.email,
      reservation.espace.nom,
      reservation.dateDebut,
      reservation.dateFin
    );

    res.status(200).json({ message: 'Réservation annulée' });

  } catch (error) {
    console.error('Erreur lors de l’annulation:', error);
    res.status(500).json({ message: 'Erreur lors de l’annulation.' });
  }
};
