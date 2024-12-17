const Reclamation = require('../models/Reclamation'); 

// Controller to create a new reclamation
// Assuming the first and last name are part of the user's profile (e.g., from Keycloak token)
exports.createReclamation = async (req, res) => {
  try {
    const { userId, reclamation, name, lastName } = req.body;

    if (!userId || !reclamation || !name || !lastName) {
      return res.status(400).json({ message: 'User ID, reclamation, name, and last name are required' });
    }

    const newReclamation = new Reclamation({
      userId,
      reclamation,
      name,  // Add first name
      lastName    // Add last name
    });

    await newReclamation.save();
    res.status(201).json(newReclamation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reclamation', error });
  }
};


// Controller to get all reclamations
exports.getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find().populate('userId', 'name lastName');
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