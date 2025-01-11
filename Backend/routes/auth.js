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
//     const token = jwt.sign({ userId: newUser._id }, process.env.JSON_SECRET, { expiresIn: "1h" });

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
//     const token = jwt.sign({ userId: user._id }, process.env.JSON_SECRET, { expiresIn: "1h" });

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
    const token = jwt.sign({ userId: newUser._id }, process.env.JSON_SECRET, { expiresIn: "1h" });

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
    const token = jwt.sign({ userId: user._id }, process.env.JSON_SECRET);
    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JSON_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware/route handler
  });
};

// router.get("/profile", authenticateToken, async (req, res) => {
//   try {
//     // Find the user by the decoded userId
//     const user = await User.findById(req.userId).select("-password");
//     console.log(user);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Send the user's profile data
//     res.status(200).json({
//       name: user.name,
//       email: user.email,
//       createdAt: user.createdAt, // Optional: Date the user joined
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

