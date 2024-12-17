const express = require('express');
const router = express.Router();
const {
  createReclamation,
  getAllReclamations,
  updateReclamation,
  deleteReclamation
} = require('../controllers/reclamationController');

// POST: Create a new reclamation
router.post('/', createReclamation);

// GET: Get all reclamations
router.get('/', getAllReclamations);

// PUT: Update an existing reclamation
router.put('/:id', updateReclamation);

// DELETE: Delete a reclamation
router.delete('/:id', deleteReclamation);

module.exports = router;