import express from 'express';
import { createImage, getImagesByPostId, deleteImage,getImages ,uploadImage} from '../controllers/imageController.js';

const router = express.Router();

router.post('/', uploadImage ,createImage);
router.get('/', getImages);
router.get('/:postId', getImagesByPostId);
router.delete('/:id', deleteImage);

export default router;
