// backend/controllers/reviewController.js

import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const createReview = async (req, res) => {
  // Now this 'id' will correctly match the route parameter from '/:id'
  const tourId = req.params.id;
  const { username, rating, reviewText } = req.body;

  try {
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    const newReview = new Review({
      tour: tourId,
      username,
      reviewText,
      rating,
    });

    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });
    
    // ✅ FIX: Standardized response to match what the frontend expects
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: savedReview,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create review" });
  }
};

export const getTourReviews = async (req, res) => {
  const tourId = req.params.id;

  try {
    const reviews = await Review.find({ tour: tourId });

    // ✅ FIX: Standardized response to wrap the array in a 'data' object
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get tour reviews" });
  }
};