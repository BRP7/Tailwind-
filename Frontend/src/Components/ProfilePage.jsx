import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [mode, setMode] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data after successful login
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile");
        setUserData(response.data); // Assuming API returns user info
      } catch (error) {
        console.log("Error fetching user data:", error);
        navigate("/login"); // Redirect to login if the user is not authenticated
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Logout logic
    localStorage.removeItem("authToken"); // Clear the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  if (!userData) return <div>Loading...</div>; // Handle loading state

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 ${mode === "light" ? "bg-gray-100" : "bg-gray-900"}`}
    >
      <div className="max-w-5xl w-full p-12 rounded-3xl shadow-xl border border-gray-200 glow-shadow relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h1 className="text-5xl font-extrabold text-center mb-6 glow-text" style={{ textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.9)" }}>
          Profile
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8">
          Welcome, {userData.name}! Here's your profile information.
        </p>

        {/* Profile Information */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <span className="font-semibold text-lg">Name:</span>
            <span>{userData.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-lg">Email:</span>
            <span>{userData.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-lg">Joined On:</span>
            <span>{new Date(userData.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="px-8 py-4 bg-[#d9bae9] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Toggle Mode Button */}
        <div className="text-center mt-8">
          <button
            onClick={toggleMode}
            className="text-[#787C97] hover:text-[#e1b6f7]"
          >
            Switch to {mode === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
