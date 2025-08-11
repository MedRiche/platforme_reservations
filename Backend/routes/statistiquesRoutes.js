// routes/statistiquesRoutes.js
const express = require('express');
const router = express.Router();
const { getStatistiques } = require('../controllers/statistiquesController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', auth, isAdmin, getStatistiques);

module.exports = router;
