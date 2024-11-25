import express from 'express';
import { createImage, getImagesByPostId, deleteImage } from '../controllers/imageController.js';

const router = express.Router();

router.post('/', createImage);
router.get('/:postId', getImagesByPostId);
router.delete('/:id', deleteImage);

export default router;
