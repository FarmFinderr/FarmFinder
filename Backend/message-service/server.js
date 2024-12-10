import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import MessageRoutes from './routes/MessageRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/messages")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Définir les routes
app.use('/api/messages', MessageRoutes);

// Point d'entrée par défaut
app.get('/', (req, res) => {
  res.status(200).send('Microservice Express.js is working correctly');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Express service running on http://localhost:${PORT}`);
});
