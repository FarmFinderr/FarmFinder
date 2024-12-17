const mongoose = require('mongoose');  // Add this line
const ReclamationSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  reclamation: {
    type: String,
    required: true
  },
  name: {  // Add first name
    type: String,
    required: true
  },
  lastName: {   // Add last name
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);
