import express from 'express';
import {
    addMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
} from'../controller/MessageController.js';

const router = express.Router();

// Routes pour les messages
router.post('/', addMessage); // Créer un message
router.get('/', getAllMessages); // Lire tous les messages
router.get('/:id', getMessageById); // Lire un message spécifique
router.put('/:id', updateMessage); // Mettre à jour un message
router.delete('/:id', deleteMessage); // Supprimer un message

export default router;
