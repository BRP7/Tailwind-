const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,  // Image is optional
    },
    projectName: {
      type: String,
      required: false,  // Project name is optional, as it can be fetched from the project
    },
    rating: {
      type: Number,  // Rating should be numeric
      required: true,  // Rating is required
    },
    feedback: {
      type: String,
      required: true,  // Feedback is required
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,  // A Review must be linked to a Project
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
