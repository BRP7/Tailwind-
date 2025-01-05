const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const connectDB = require('./db/connectDB.js');

dotenv.config();

const app = express();
const port = 5000;

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.DB_URI) {
  console.error("Missing required environment variables. Please check your .env file.");
  process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields (name, email, and message) are required.");
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name}`,
    text: message || 'No message content',
    replyTo: email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send("Error sending email: " + error.message);
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send("Email sent successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
