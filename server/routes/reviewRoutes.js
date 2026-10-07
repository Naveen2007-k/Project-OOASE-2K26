import express from 'express';
import { createReview, getBeauticianReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createReview);

router.get('/beautician/:id', getBeauticianReviews);

export default router;
