const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  reclamation: {
    type: String,
    required: true
  },
  image: {
    type: String, // File path for the uploaded image
    required: false
  }
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);
