import express from 'express';
import { createReaction, getReactionsByPostId, getUserReaction, deleteReaction, updateReaction } from '../controllers/reactionController.js';

const router = express.Router();

router.post('/', createReaction);
router.get('/post/:postId', getReactionsByPostId);
router.get('/post/:postId/user/:userId', getUserReaction);
router.delete('/:id', deleteReaction);
router.put('/:id', updateReaction);

export default router;
