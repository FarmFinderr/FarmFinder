import express from 'express';
import {
    createComment,
    getCommentsByPostId,
    deleteComment,
    updateComment,
} from '../controllers/CommentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getCommentsByPostId);
router.delete('/:id', deleteComment);
router.put('/:id', updateComment);

export default router;
