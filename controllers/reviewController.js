const Review = require("../models/reviewModel");

// Add a review
const addReview = async (req, res) => {
  try {
    console.log("Adding review:", req.body); // Debugging line
    const { name, location, rating, feedback } = req.body;
    const review = new Review({ name, location, rating, feedback });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review", error); // Debugging line
    res.status(400).json({ message: "Error adding review", error });
  }
};

// Get all reviews
const getReviews = async (req, res) => {
  try {
    console.log("Fetching reviews"); // Debugging line
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews", error); // Debugging line
    res.status(400).json({ message: "Error fetching reviews", error });
  }
};

module.exports = {
  addReview,
  getReviews,
};
