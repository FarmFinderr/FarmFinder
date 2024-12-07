import Reaction from '../models/Reaction.js';

export const createReaction = async (req, res, next) => {
    try {
        const { postId, userId, reactionType, date } = req.body;

        let existingReaction = await Reaction.findOne({ postId, userId });

        if (existingReaction) {
            existingReaction.reactionType = reactionType;
            existingReaction.date = date; 
            const updatedReaction = await existingReaction.save();
            return res.status(200).json(updatedReaction); 
        } else {
            const reaction = new Reaction({ postId, userId, reactionType, date });
            const savedReaction = await reaction.save();
            return res.status(201).json(savedReaction); 
        }
    } catch (err) {
        next(err);
    }
};


export const getReactionsByPostId = async (req, res, next) => {
    try {
        const reactions = await Reaction.find({ postId: req.params.postId });
        res.json(reactions);
    } catch (err) {
        next(err);
    }
};

export const getUserReaction = async (req, res, next) => {
    try {
        const reaction = await Reaction.findOne({ postId: req.params.postId, userId: req.params.userId });
        res.json(reaction);
    } catch (err) {
        next(err);
    }
};

export const deleteReaction = async (req, res, next) => {
    try {
        const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Réaction supprimée', deletedReaction });
    } catch (err) {
        next(err);
    }
};

export const updateReaction = async (req, res, next) => {
    try {
        const updatedReaction = await Reaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReaction);
    } catch (err) {
        next(err);
    }
};
