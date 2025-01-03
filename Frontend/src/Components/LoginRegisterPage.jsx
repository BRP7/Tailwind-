import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const LoginRegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState(""); // To store success/error messages
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mode, setMode] = useState("light");

  const navigate = useNavigate(); // Initialize the navigate function for routing

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    const strength = password.length > 8 ? 3 : password.length > 5 ? 2 : 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? "http://localhost:5000/api/auth/register" : "http://localhost:5000/api/auth/login"; // Use appropriate endpoint
//     try {
//       const response = await axios.post(url, formData);
//       if (response.status === 200) {
//         console.log(response.data);
//         setResponseMessage(isRegister ? "Registration successful!" : "Login successful!");

//         // Store the JWT token in localStorage/sessionStorage (or state)
//         localStorage.setItem("token", response.data.token);

//         // Redirect to profile page after successful login
//         navigate("/profile");
        
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//         });
//       }
//     } catch (error) {
//       setResponseMessage("Failed to submit the form. Please try again.");
//     }
//   };

//   // src/components/LoginRegisterPage.js
// const handleSubmit = async (e) => {
//   e.preventDefault();
  // const url = isRegister ? "/api/auth/register" : "/api/auth/login"; // Use the correct URL for register/login
  try {
    const response = await axios.post(url, formData);
    if (response.status === 200) {
      setResponseMessage(isRegister ? "Registration successful!" : "Login successful!");
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      navigate("/profile"); // Redirect to profile page
    }
  } catch (error) {
    setResponseMessage("An error occurred. Please try again.");
  }
};


  // Function to navigate to the homepage
  const handleClose = () => {
    navigate("/"); // Navigate back to the homepage (or any other route)
  };

  return (
    <div
      id="login-register"
      className={`min-h-screen flex items-center justify-center p-8 ${mode === "light" ? "bg-gray-100" : "bg-gray-900"}`}
    >
      <div className="max-w-5xl w-full p-12 rounded-3xl shadow-xl border border-gray-200 glow-shadow relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h1 className="text-5xl font-extrabold text-center mb-6 glow-text" style={{ textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.9)" }}>
          {isRegister ? "Create Account" : "Login"}
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8">
          {isRegister
            ? "Join us to create the best experience. Just fill in the details below."
            : "Welcome back! Please log in to your account."}
        </p>

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D5A0EF]"
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D5A0EF]"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D5A0EF]"
              required
            />
            {isRegister && (
              <div className={`mt-2 text-sm text-${passwordStrength === 1 ? "red" : passwordStrength === 2 ? "yellow" : "green"}-500`}>
                Password Strength: {["Weak", "Medium", "Strong"][passwordStrength - 1]}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-4 bg-[#d9bae9] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
            >
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>

        {/* Display Response Message */}
        {responseMessage && (
          <div className="mt-4 text-center text-lg font-semibold">
            {responseMessage}
          </div>
        )}

        {/* Toggle between Login and Register */}
        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="text-[#787C97] hover:text-[#e1b6f7]"
          >
            {isRegister ? "Already have an account? Login" : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
