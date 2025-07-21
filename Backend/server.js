// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const espaceRoutes = require('./routes/espaceRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const statistiquesRoutes = require('./routes/statistiquesRoutes'); // Si tu as des statistiques
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');

// ✅ Middlewares
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); // ← très important pour req.body

app.use('/api/auth', authRoutes);
app.use('/api/espaces', espaceRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/stats', statistiquesRoutes); // Si tu as des statistiques
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Routes
app.get('/', (req, res) => {
  res.send('API Running...');
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB error:', err);
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
