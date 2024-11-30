const Reclamation = require('../models/Reclamation');

// Controller to create a new reclamation
exports.createReclamation = async (req, res) => {
  try {
    const { userId, reclamation } = req.body; // Added userId

    // Ensure that userId and reclamation are provided
    if (!userId || !reclamation) {
      return res.status(400).json({ message: 'User ID and reclamation are required' });
    }

    // Create a new reclamation object with userId
    const newReclamation = new Reclamation({ userId, reclamation });

    // Save to the database
    await newReclamation.save();
    
    res.status(201).json(newReclamation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reclamation', error });
  }
};

// Controller to get all reclamations
exports.getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reclamations', error });
  }
};

// Controller to update a reclamation
exports.updateReclamation = async (req, res) => {
  try {
    const { reclamation } = req.body;
    const updatedReclamation = await Reclamation.findByIdAndUpdate(
      req.params.id, 
      { reclamation },
      { new: true } // This will return the updated document
    );
    
    if (!updatedReclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }

    res.status(200).json(updatedReclamation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reclamation', error });
  }
};

// Controller to delete a reclamation
exports.deleteReclamation = async (req, res) => {
  try {
    const deletedReclamation = await Reclamation.findByIdAndDelete(req.params.id);
    
    if (!deletedReclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }

    res.status(200).json({ message: 'Reclamation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reclamation', error });
  }
};
