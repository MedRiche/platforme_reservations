const express = require('express');
const router = express.Router();
const {
  createEspace,
  getAllEspaces,
  getEspaceById,
  updateEspace,
  deleteEspace
} = require('../controllers/espace.controller');
const auth = require('../middlewares/auth.middleware');

// Toutes les routes protégées (admin uniquement si besoin)
router.post('/', auth, createEspace);
router.get('/', auth, getAllEspaces);
router.get('/:id', auth, getEspaceById);
router.put('/:id', auth, updateEspace);
router.delete('/:id', auth, deleteEspace);

module.exports = router;
