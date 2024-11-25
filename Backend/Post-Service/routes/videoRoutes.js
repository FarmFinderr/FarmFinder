import express from 'express';
import { createVideo, getVideosByPostId, deleteVideo, updateVideo } from '../controllers/videoController.js';

const router = express.Router();

router.post('/', createVideo);
router.get('/post/:postId', getVideosByPostId);
router.delete('/:id', deleteVideo);
router.put('/:id', updateVideo);

export default router;
