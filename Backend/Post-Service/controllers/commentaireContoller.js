import Comment from '../models/Commentaire.js';

export const createComment = async (req, res, next) => {
    try {
        const { postId, userId, text } = req.body;
        const comment = new Comment({ postId, userId, text });
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        next(err);
    }
};

export const getCommentsByPostId = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'name'); // Populate user details if needed
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Commentaire supprimé', deletedComment });
    } catch (err) {
        next(err);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true }
        );
        res.json(updatedComment);
    } catch (err) {
        next(err);
    }
};
