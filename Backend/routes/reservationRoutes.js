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
router.delete('/:id', auth, deleteReservation);
router.get('/reservations/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const reservations = await Reservation.find({ user: userId }).populate('espace');
  res.json(reservations);
});
module.exports = router;
