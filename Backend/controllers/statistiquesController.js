const Reservation = require('../models/Reservation');
const Espace = require('../models/Espace');

// 📊 Statistique : Nombre de réservations par espace
exports.reservationsParEspace = async (req, res) => {
  try {
    const stats = await Reservation.aggregate([
      { $match: { statut: 'confirmée' } },
      {
        $group: {
          _id: '$espace',
          totalReservations: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'espaces',
          localField: '_id',
          foreignField: '_id',
          as: 'espace'
        }
      },
      {
        $unwind: '$espace'
      },
      {
        $project: {
          _id: 0,
          espace: '$espace.nom',
          totalReservations: 1
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur statistiques espace', error });
  }
};

// 📆 Statistique : Nombre de réservations par jour
exports.reservationsParJour = async (req, res) => {
  try {
    const stats = await Reservation.aggregate([
      { $match: { statut: 'confirmée' } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$dateDebut" }
          },
          total: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur statistiques jour', error });
  }
};
