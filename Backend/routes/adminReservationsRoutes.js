const  express = require('express');
const router = express.Router();
const { getAllReservations } = require('../controllers/adminReservationController');
const { confirmerReservation } = require('../controllers/reservationController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const Reservation = require('../models/Reservation');


router.get('/', auth, isAdmin, getAllReservations);
router.patch('/:id/confirmer', auth, isAdmin, confirmerReservation);



module.exports = router;
