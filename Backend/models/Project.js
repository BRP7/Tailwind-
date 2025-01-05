const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,  // A Project must have a client (user)
    },
    image: {
      type: String,
      required: true,
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
