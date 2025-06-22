// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const espaceRoutes = require('./routes/espace.routes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/espaces', espaceRoutes);

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
