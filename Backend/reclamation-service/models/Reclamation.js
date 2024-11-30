const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({
  userId:{
    type: Number,
    required:true
  },
  reclamation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);
