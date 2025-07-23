const express = require('express');
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  deleteReservation
} = require('../controllers/reservationController');
const auth = require('../middlewares/auth');

router.post('/', auth, createReservation);
router.get('/mes-reservations', auth, getUserReservations);
router.delete('/api/reservations/:id', auth, deleteReservation);


module.exports = router;
