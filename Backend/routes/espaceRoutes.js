const express = require('express');
const router = express.Router();
const {
  createEspace,
  getAllEspaces,
  getEspaceById,
  updateEspace,
  deleteEspace
} = require('../controllers/espaceController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Toutes les routes protégées (admin uniquement si besoin)
router.post('/',  auth , isAdmin, createEspace);
router.get('/',  getAllEspaces);
router.get('/:id', getEspaceById);
router.put('/:id', isAdmin, updateEspace);
router.delete('/:id', isAdmin, deleteEspace);

module.exports = router;
