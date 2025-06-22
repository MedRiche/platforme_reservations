const express = require('express');
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  deleteReservation
} = require('../controllers/reservation.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, createReservation);
router.get('/mes-reservations', auth, getUserReservations);
router.delete('/:id', auth, deleteReservation);

module.exports = router;
