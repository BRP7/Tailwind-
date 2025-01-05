import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); // State for rating
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      const fetchUserProjects = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/projects", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              userId: userData._id,
            },
          });
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching user projects:", error);
        }
      };

      fetchUserProjects();
    }
  }, [userData]);

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    if (reviewText.trim() === "") {
      alert("Please write a review before submitting.");
      return;
    }
    if (rating === 0) {
      alert("Please give a rating before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/projects/${selectedProject._id}/review`,
        { reviewText, rating }, // Send both reviewText and rating
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReviewModal(false); // Close modal after review submission
      alert("Review submitted successfully!");
      setReviewText("");
      setRating(0); // Reset rating after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review.");
    }
  };

  const openReviewModal = (project) => {
    setSelectedProject(project);
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    setReviewModal(false);
    setSelectedProject(null);
    setReviewText("");
    setRating(0); // Reset the rating when closing the modal
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div id="profile-page" className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <div className="max-w-5xl w-full p-12 rounded-3xl shadow-xl border border-gray-200 glow-shadow relative">
        {/* Close Button */}
        <button onClick={() => navigate("/")} className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-gray-700">
          &times;
        </button>

        <h1 className="text-5xl font-extrabold text-center mb-6 glow-text" style={{ textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.9)" }}>
          Profile
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8">Welcome back! Here's your profile information and projects.</p>

        {/* Profile Content */}
        <div className="flex space-x-8">
          {/* Left side: Profile */}
          <div className="w-1/3 flex flex-col items-center space-y-6">
            <img
              src={userData.profileImage || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="rounded-full w-40 h-40 object-cover border-4 border-[#D5A0EF] shadow-xl"
            />
            <h2 className="text-3xl font-extrabold text-center text-[#787C97]">{userData.name}</h2>
            <p className="text-lg text-center text-gray-400 mb-0">{userData.email}</p>
            <p className="text-lg text-center text-gray-400 mt-0">Member since: {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Right side: Projects */}
          <div className="w-2/3">
            <h2 className="text-3xl font-bold text-[#D5A0EF] mb-6">Projects You Worked On</h2>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                    <h3 className="text-xl font-semibold text-[#D5A0EF] mb-4">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <button
                      onClick={() => openReviewModal(project)}
                      className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
                    >
                      Add Review
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-10">
                <p className="text-xl text-gray-500 mb-4">No projects yet</p>
                <button onClick={() => navigate("/get-started")} className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all">
                  Get Started - Book a Call
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Review Modal */}
        {reviewModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold text-[#6B7280] mb-4">Write a Review for {selectedProject.name}</h2>

              {/* Star Rating */}
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= rating ? "#D5A0EF" : "#6B7280"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => handleRatingChange(star)}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={handleReviewChange}
                className="w-full p-4 border rounded-lg mb-4 border-purple-200 focus:ring-2 focus:ring-purple-300"
                placeholder="Write your review here..."
                rows="5"
              ></textarea>
              <div className="flex justify-between">
                <button
                  onClick={handleSubmitReview}
                  className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
                >
                  Submit Review
                </button>
                <button
                  onClick={closeReviewModal}
                  className="px-6 py-2 bg-gray-100 rounded-full text-[#D5A0EF] shadow-lg hover:bg-gray-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
