const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: false, // Optional image field
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: false, // Optional reviews field
    }],
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "On Hold"],
      default: "Not Started", // Default status is 'Not Started'
    },
    startDate: {
      type: Date,
      required: false, // Optional field for when the project started
    },
    endDate: {
      type: Date,
      required: false, // Optional field for when the project ended
    },
    tags: [{
      type: String,
      required: false, // Optional array of tags to categorize the project
    }],
    budget: {
      type: Number,
      required: false, // Optional field for project budget or cost
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
