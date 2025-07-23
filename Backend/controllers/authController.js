const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nom, email, motDePasse, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new User({ nom, email, motDePasse: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { nom, email } = req.body;

    if (!nom || !email) {
      return res.status(400).json({ message: "Nom et email requis" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { nom, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Profil mis à jour avec succès", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

