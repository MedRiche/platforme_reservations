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
const upload = require('../middlewares/upload');

// Toutes les routes protégées (admin uniquement si besoin)
// Ajouter `upload.single('image')` dans la route
router.post('/', upload.single('image'), createEspace);
router.get('/',  getAllEspaces);
router.get('/:id', getEspaceById);
router.put('/:id', upload.single('image'), updateEspace);
router.delete('/:id',auth, isAdmin, deleteEspace);

module.exports = router;
