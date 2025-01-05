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
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;