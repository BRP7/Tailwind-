import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetStartedPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !email) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate a form submission
    alert("Form submitted successfully!");
    // You can redirect after form submission if necessary
    navigate("/"); // For example, redirect to home after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full p-10 rounded-xl shadow-2xl bg-white relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h1 className="text-4xl font-extrabold text-center text-[#787C97] mb-4">Get Started</h1>
        <p className="text-lg leading-relaxed text-center mb-8 text-[#9ca3af]">
          Please provide your details to get started with us.
        </p>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-gray-50 rounded-lg shadow-lg">
          <label className="text-md text-[#9ca3af] mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border rounded-lg mb-4 border-purple-200 focus:ring-2 focus:ring-purple-300"
            placeholder="Enter your full name"
          />

          <label className="text-md text-[#9ca3af] mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-lg mb-4 border-purple-200 focus:ring-2 focus:ring-purple-300"
            placeholder="Enter your email"
          />

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
