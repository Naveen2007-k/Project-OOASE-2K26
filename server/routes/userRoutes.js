import express from 'express';
import { getBeauticians, getUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/beauticians', getBeauticians);
router.get('/', protect, admin, getUsers);

export default router;
