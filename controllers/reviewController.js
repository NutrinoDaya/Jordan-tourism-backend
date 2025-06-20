import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
export const createReview = async (req, res) => {
  const { username, rating, reviewText } = req.body;
  const { TourId } = req.params;

  if (!username || !rating || !reviewText) {
    return res.status(400).json({ message: "Username, rating, and reviewText are required fields" });
  }

  try {
    const tour = await Tour.findById(TourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const newReview = new Review({
      tour: tour._id,
      username: username,
      reviewText: reviewText,
      rating,
    });

    await newReview.save();
    tour.reviews.push(newReview);
    await tour.save();

    // 🌟 FIX: Return the newly created review object
    res.status(201).json(newReview);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create review" });
  }
};


// Get all reviews for a tour
export const getTourReviews = async (req, res) => {
  const { TourId } = req.params;

  try {
    // Check if the tour exists
    const tour = await Tour.findById(TourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Get all reviews for the tour
    const reviews = await Review.find({ tour: TourId });

    res.status(200).json({
      count: reviews.length,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tour reviews" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Review.findByIdAndDelete(reviewId);

    const tourId = review.tour;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const updatedReviews = tour.reviews.filter(
      (tourReview) => tourReview.toString() !== reviewId
    );

    tour.reviews = updatedReviews;
    await tour.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
