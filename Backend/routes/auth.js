// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const validator = require("validator"); // Email validation
// const User = require("../models/User");

// const router = express.Router();

// // Helper function to validate input fields
const validateEmail = (email) => validator.isEmail(email);
const validatePassword = (password) => password.length >= 6; // Minimum password length

// // Register route
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   // Input validation
//   if (!validateEmail(email)) {
//     return res.status(400).json({ message: "Invalid email address" });
//   }
//   if (!validatePassword(password)) {
//     return res.status(400).json({ message: "Password must be at least 6 characters" });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     // Create JWT token
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     // Send response with the token
//     res.status(201).json({
//       message: "Registration successful!",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Login route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!validateEmail(email)) {
//     return res.status(400).json({ message: "Invalid email address" });
//   }
//   if (!validatePassword(password)) {
//     return res.status(400).json({ message: "Password must be at least 6 characters" });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Create JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({
//       message: "Login successful!",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;




const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Your User model
const jwt = require("jsonwebtoken");
const router = express.Router();

// Register route
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Please provide name, email, and password" });
//   }

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ id: newUser._id }, process.env.JSON_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ message: "User registered successfully", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send response with the token
    res.status(201).json({
      message: "Registration successful!",
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JSON_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

