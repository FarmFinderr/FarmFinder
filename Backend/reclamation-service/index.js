const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());


// Routes
const reclamationRoutes = require('./routes/reclamations');
app.use('/api/reclamations', reclamationRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/reclamationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

// Start the server
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
});
