const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    rating: {
      type: String,  // Could be numeric, or use an enum for ratings
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);