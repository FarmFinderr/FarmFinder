const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  createReclamation,
  getAllReclamations,
  updateReclamation,
  deleteReclamation
} = require('../controllers/reclamationController');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name with timestamp
  }
});

const upload = multer({ storage });

// POST: Create a new reclamation
router.post('/', createReclamation);

// GET: Get all reclamations
router.get('/', getAllReclamations);

// PUT: Update an existing reclamation
router.put('/:id', updateReclamation);

// DELETE: Delete a reclamation
router.delete('/:id', deleteReclamation);

module.exports = router;
