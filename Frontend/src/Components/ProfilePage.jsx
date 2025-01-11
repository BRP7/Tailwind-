import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);  // To track if the user is editing the review
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
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      const fetchUserProjects = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/projects", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            params: { userId: userData._id },
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

  // const handleSubmitReview = async () => {
  //   if (reviewText.trim() === "") {
  //     alert("Please write a review before submitting.");
  //     return;
  //   }
  //   if (rating === 0) {
  //     alert("Please give a rating before submitting.");
  //     return;
  //   }

  //   try {
  //     if (isEditing) {
  //       // Update existing review
  //       await axios.put(
  //         `http://localhost:5000/api/projects/${selectedProject._id}/review`,
  //         { reviewText, rating },
  //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  //       );
  //     } else {
  //       // Add new review
  //       await axios.post(
  //         `http://localhost:5000/api/projects/${selectedProject._id}/review`,
  //         { reviewText, rating },
  //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  //       );
  //     }

  //     setReviewModal(false);
  //     alert(isEditing ? "Review updated successfully!" : "Review submitted successfully!");
  //     setReviewText("");
  //     setRating(0);
  //     setIsEditing(false); // Reset editing mode after submission
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     alert("There was an error submitting your review.");
  //   }
  // };


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
      let response; 
      if (isEditing && selectedProject.reviews && selectedProject.reviews.length > 0) {
        // Update existing review
        console.log(selectedProject.reviews[0]._id);  // Make sure this is a valid ID

        response = await axios.put(
          `http://localhost:5000/api/projects/reviews/${selectedProject.reviews[0]._id}`,
          { feedback: reviewText, rating },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        
      } else {
        // Add new review
        response = await axios.post(
          `http://localhost:5000/api/projects/${selectedProject._id}/review`,
          { reviewText, rating },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }
  
      setReviewModal(false);
      alert(isEditing ? "Review updated successfully!" : "Review submitted successfully!");
      setReviewText("");
      setRating(0);
      setIsEditing(false); // Reset editing mode after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review.");
    }
  };
  
  const openReviewModal = (project) => {
    setSelectedProject(project);
    if (project.reviews) {
      console.log(project.reviews[0].feedback);
      setReviewText(project.reviews[0].feedback);
      setRating(project.reviews[0].rating);
      setIsEditing(true);  // Mark as editing
    } else {
      setReviewText("");
      setRating(0);
      setIsEditing(false);  // Mark as adding new review
    }
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    setReviewModal(false);
    setSelectedProject(null);
    setReviewText("");
    setRating(0);
    setIsEditing(false); // Reset editing state
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full p-10 rounded-xl shadow-2xl bg-white relative">
        {/* Close Button */}
        <button onClick={() => navigate("/")} className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-gray-700">
          &times;
        </button>

        <h1 className="text-5xl font-extrabold text-center text-[#ba87d3] mb-4">Profile</h1>
        <p className="text-lg leading-relaxed text-center mb-16 text-[#9ca3af]">Welcome back! Here's your profile and projects.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left side: User Profile */}
          <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-lg shadow-lg">
            <img
              src={userData.profileImage || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="rounded-full w-32 h-32 object-cover glow-shadow "
            />
            <h2 className="text-2xl font-bold text-[#D5A0EF]">{userData.name}</h2>
            <p className="text-md text-[#9ca3af]">{userData.email}</p>
            <p className="text-md text-[#9ca3af]">Member since: {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Right side: Projects */}
          {projects.length > 0 ? (
            <div className="col-span-2 sm:col-span-1">
              <div className="grid grid-cols-1 gap-2">
                <h2 className="text-[1.6rem] font-semibold bg-white text-[#a9b0bc] rounded-lg p-2 mb-2">Projects</h2>
                {projects.map((project) => (
                  <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <h3 className="text-xl font-semibold text-[#ba87d3] mb-4">{project.projectName}</h3>
                    <p className="text-[#9ca3af] mb-4">{project.description}</p>
                    <button
                      onClick={() => openReviewModal(project)}
                      className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
                    >
                      {project.reviews ? "show Review" : "Add Review"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-2">
              <div className="flex justify-center items-center flex-col w-full h-full">
                <p className="text-xl text-center text-[#9CA3AF] mb-4">No projects yet</p>
                <button
                  onClick={() => navigate("/get-started")}
                  className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
                >
                  Get Started - Book a Call
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {reviewModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold text-[#6B7280] mb-4">{isEditing ? "Edit Your Review" : "Write a Review"}</h2>

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
                disabled={!isEditing} // Disable if not editing
              ></textarea>
              <div className="flex justify-between">
                {isEditing ? (
                  <button
                    onClick={handleSubmitReview}
                    className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
                  >
                    Update Review
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitReview}
                    className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
                  >
                    Submit Review
                  </button>
                )}
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
