// backend/routes/review.js

import express from 'express';
import {
  createReview,
  getTourReviews,
  deleteReview,
} from "../controllers/reviewController.js";
// import verifyUser from '../utils/verifyToken.js'; // You can add this middleware back when needed

const reviewRoute = express.Router();

// ❗️ FIX: Changed '/:TourId' to '/:id' for consistency
reviewRoute.post('/:id', createReview);

// This was already correct
reviewRoute.get('/:id', getTourReviews);

// This seems correct, assuming you delete by reviewId
reviewRoute.delete('/:reviewId', deleteReview);

export default reviewRoute;