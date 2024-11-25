import Reaction from '../models/Reaction.js';

// Ajouter une nouvelle réaction
export const createReaction = async (req, res, next) => {
    try {
        const { postId, userId, reactionType, date } = req.body; 
        const reaction = new Reaction({ postId, userId, reactionType, date });
        const savedReaction = await reaction.save();
        res.status(201).json(savedReaction);
    } catch (err) {
        next(err);
    }
};

// Obtenir toutes les réactions d'un post
export const getReactionsByPostId = async (req, res, next) => {
    try {
        const reactions = await Reaction.find({ postId: req.params.postId });
        res.json(reactions);
    } catch (err) {
        next(err);
    }
};

// Obtenir les réactions d'un utilisateur pour un post
export const getUserReaction = async (req, res, next) => {
    try {
        const reaction = await Reaction.findOne({ postId: req.params.postId, userId: req.params.userId });
        res.json(reaction);
    } catch (err) {
        next(err);
    }
};

// Supprimer une réaction
export const deleteReaction = async (req, res, next) => {
    try {
        const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Réaction supprimée', deletedReaction });
    } catch (err) {
        next(err);
    }
};

// Mettre à jour une réaction
export const updateReaction = async (req, res, next) => {
    try {
        const updatedReaction = await Reaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReaction);
    } catch (err) {
        next(err);
    }
};
