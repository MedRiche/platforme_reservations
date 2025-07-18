const express = require('express');
const router = express.Router();
const { reservationsParEspace, reservationsParJour } = require('../controllers/statistiquesController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin'); // optionnel si tu as un rôle admin

// Statistiques protégées
router.get('/reservations-par-espace', auth, isAdmin, reservationsParEspace);
router.get('/reservations-par-jour', auth, isAdmin, reservationsParJour);

module.exports = router;

