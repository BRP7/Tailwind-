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

    setTimeout(() => {
      setResponseMessage("");
    }, 3000);
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full p-10 rounded-xl shadow-2xl bg-white relative">
        <h1 className="text-4xl font-extrabold text-center text-[#787C97] mb-4">
          Contact Us
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8 text-[#9ca3af]">
          We’re here to help you create the perfect portfolio website. Reach out to us with your ideas or questions!
        </p>

        {/* Error Message */}
        {responseMessage && (
          <div className="text-center mb-4 text-lg font-semibold text-green-500">
            <p>{responseMessage}</p>
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border rounded-lg mb-4 border-purple-200 focus:ring-2 focus:ring-purple-300"
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
              className="w-full p-4 border rounded-lg mb-4 border-purple-200 focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-4 border rounded-lg mb-4 border-purple-200 focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
