const express = require('express');
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  deleteReservation,
  getReservationsByEspace
} = require('../controllers/reservationController');

const auth = require('../middlewares/auth');

router.post('/', auth, createReservation);
router.get('/mes-reservations', auth, getUserReservations);
router.delete('/:id', auth, deleteReservation);

// PUBLIC (ou protégée si tu veux) : récupérer réservations par espace
router.get('/espace/:id', getReservationsByEspace);

module.exports = router;
