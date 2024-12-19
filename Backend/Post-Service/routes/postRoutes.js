import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getTotalPosts,
    getPostsByLocation
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/statsposts', getPostsByLocation);
router.get('/total', getTotalPosts);
router.get('/get', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
