const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
