import React, { useState } from "react";
import axios from "axios"; // Import axios

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState(""); // To store success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending the form data to the backend using axios
    try {
      const response = await axios.post("http://localhost:5000/send-email", formData); // Replace URL with your backend API

      if (response.status === 200) {
        setResponseMessage("Your message was sent successfully!");
        // Optionally clear the form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      setResponseMessage("Failed to send your message. Please try again.");
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-8"
    >
      <div className="max-w-5xl w-full p-12 bg-white rounded-3xl shadow-xl border border-gray-200 glow-shadow relative">
        <h1 className="text-5xl font-extrabold text-center mb-6 glow-text" style={{ textShadow: "0 0 20px #CDF3FB, 0 0 30px #00d4ff" }}>
          Contact NxtSite
        </h1>
        <p className="text-lg leading-relaxed text-center text-gray-700 mb-8">
          We’re here to help you create the perfect portfolio website. Reach out to us with your ideas or questions!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-4 bg-cyan-400 text-gray-900 rounded-full shadow-lg hover:bg-cyan-500 transition-all"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Display Response Message */}
        {responseMessage && (
          <div className="mt-4 text-center text-lg font-semibold text-gray-700">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
