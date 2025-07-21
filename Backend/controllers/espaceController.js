const Espace = require('../models/Espace');



exports.createEspace = async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const espace = new Espace({
      ...req.body,
      imageUrl
    });

    await espace.save();
    res.status(201).json(espace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllEspaces = async (req, res) => {
  try {
    const espaces = await Espace.find();
    res.json(espaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEspaceById = async (req, res) => {
  try {
    const espace = await Espace.findById(req.params.id);
    if (!espace) return res.status(404).json({ message: 'Espace non trouvé' });
    res.json(espace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEspace = async (req, res) => {
  try {
    const updated = await Espace.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Espace non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEspace = async (req, res) => {
  try {
    const deleted = await Espace.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Espace non trouvé' });
    res.json({ message: 'Espace supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
