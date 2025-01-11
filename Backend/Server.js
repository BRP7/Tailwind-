const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const connectDB = require('./db/connectDB.js');
const Project = require('./models/Project.js');

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

app.post("/send-bookcall", (req, res) => {
  const { name, email, phone, selectedDate, location, selectedTime, country, additionalInfo } = req.body;

  if (!name || !email || !phone || !selectedDate || !location || !selectedTime) {
    return res.status(400).send("All required fields must be filled.");
  }
  console.log(req.body);

  const mailOptions = {
    from: email, // Email from which it will be sent
    to: process.env.EMAIL_USER,   // Recipient email (you can set it to any email)
    replyTo: email,
    subject: `Booking Request from ${name}`, // Subject of the email
    text: `
      You have received a new booking request!

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Selected Date: ${selectedDate}
      Location: ${location}
      Selected Time: ${selectedTime}
      Country: ${country || 'N/A'}
      Additional Information: ${additionalInfo || 'N/A'}
    `, // Email body with the form data
    replyTo: email, // Reply to the sender's email
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send("Error sending email: " + error.message);
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send("Email sent successfully!");
  });
})


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
