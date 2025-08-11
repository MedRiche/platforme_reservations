// controllers/statistiquesController.js
const Espace = require('../models/Espace');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

exports.getStatistiques = async (req, res) => {
  try {
    const totalEspaces = await Espace.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalUtilisateurs = await User.countDocuments();

    const reservationsParStatut = await Reservation.aggregate([
      { $group: { _id: "$statut", count: { $sum: 1 } } }
    ]);

    const topEspaces = await Reservation.aggregate([
      { $group: { _id: "$espace", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: "espaces", localField: "_id", foreignField: "_id", as: "espace" } },
      { $unwind: "$espace" },
      { $project: { nom: "$espace.nom", count: 1 } }
    ]);

    res.json({
      totalEspaces,
      totalReservations,
      totalUtilisateurs,
      reservationsParStatut,
      topEspaces
    });
  } catch (err) {
    console.error("Erreur stats:", err);
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques." });
  }
};
