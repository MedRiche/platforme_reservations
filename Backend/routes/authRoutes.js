const express = require('express');
const router = express.Router();
const { register, login , updateProfile } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.put('/update-profile/:id', updateProfile);



module.exports = router;
