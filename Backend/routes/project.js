const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.js");
const User = require("../models/User.js");
const Review = require("../models/Review.js");
const authenticate = require("./auth.js");

router.use(authenticate);

router.get("/review", async (req, res) => {
  try {
    const reviews = await Review.find().populate("project");  // Populate the associated project

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Server error fetching reviews" });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("client reviews");  // Populate client and reviews

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    res.json(projects);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add this in your project route file (e.g., routes/project.js)

router.get("/:projectId/reviews", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("reviews");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project.reviews);
  } catch (err) {
    console.error("Error fetching reviews for the project:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Add this in your project route file (e.g., routes/project.js)

router.put("/reviews/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { feedback, rating } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review fields
    if (feedback) review.feedback = feedback;
    if (rating) review.rating = rating;

    await review.save();

    // Fetch the updated reviews for the project
    const updatedProject = await Project.findById(review.project)
      .populate("reviews");

    res.status(200).json({
      message: "Review updated successfully",
      reviews: updatedProject.reviews,  // Return updated reviews array
    });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Server error" });
  }
});




router.post("/:projectId/review", authenticate, async (req, res) => {
  const { projectId } = req.params;
  const { reviewText, rating } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
    }

    const newReview = {
      feedback: reviewText,
      rating: rating,
      project: projectId,
    };

    const review = new Review(newReview);
    await review.save();


   let someDefaultClientId = "6778b3966ae65dd37f2fe7d9" ;
    project.reviews.push(review._id);
    project.image = project.image || "default_image_path";  // Make sure `image` field is filled
    project.client = project.userId || someDefaultClientId;  // Make sure `client` field is filled
    project.projectName = project.name || "Default Project Name";  // Ensure `projectName` is filled

await project.save();

    await project.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
});


module.exports = router;
