const Espace = require('../models/Espace');



exports.createEspace = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const espace = new Espace({
      ...req.body,
      image: imagePath
    });

    await espace.save();
    res.status(201).json(espace);
  } catch (err) {
    console.error(err);
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
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Espace.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Espace non trouvé' });

    res.json(updated);
  } catch (err) {
    console.error(err);
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
