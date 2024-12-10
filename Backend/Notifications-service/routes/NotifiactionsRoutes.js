import express from 'express';
import {
   AddNotif,
   getNotificationsByIdRecu,
} from '../controller/NotificationController.js';

const router = express.Router();

router.post('/', AddNotif);
router.get('/:id', getNotificationsByIdRecu);

export default router;