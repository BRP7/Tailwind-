import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing FontAwesome stars


const Portfolio = ({ isVisible }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div
      id="portfolio"
      className={`min-h-screen flex flex-col items-center justify-start p-8 relative overflow-hidden transition-colors duration-900 ${
        isVisible ? "bg-gradient-to-br from-white to-[#EFE7E7]" : "bg-[#EFE7E7]"
      }`}
    >
      {/* Header */}
      <h1
        className="text-5xl font-extrabold text-center mb-[5rem] glow-text"
        style={{
          textShadow:
            "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.7)",
        }}
      >
        Portfolios
      </h1>

      {/* Projects List - Full Width Cards */}
      <div className="w-full max-w-6xl space-y-12">
        {projects.map((project) => (
          <div
            key={project._id}
            className="relative p-8 bg-[#EFE7E7] rounded-3xl shadow-xl border border-gray-200 glow-shadow group hover:scale-105 transition-transform duration-300 w-full"
          >
            {/* Background Blur for Glass Effect */}
            <div className="absolute inset-0 bg-cyan-100/10 blur-lg rounded-2xl z-0"></div>
            <div className="absolute inset-0 border border-[#d5a0ef] rounded-2xl opacity-50 z-0"></div>

            {/* Project Content */}
            <div className="relative z-10 text-center">
              {/* Project Image */}
              <div className="flex justify-center items-center mb-4">
                <img
                  src={project.image || "../public/image.png"}
                  alt={project.projectName}
                  className="rounded-full glow-shadow w-32 h-32 object-cover"
                />
              </div>

              {/* Project Title and Client Name - Aligned center with same font size */}
              <div className="flex flex-col md:flex-row justify-center items-center font-extrabold text-gray-600 mb-4">
    {/* Project Name */}
    <h2 className="text-2xl md:text-3xl mb-2 md:mb-0">
      {project.projectName} 
    </h2>
    <span className="hidden md:inline-block mx-2">|</span>
    {/* Client Name */}
    <p className="text-2xl md:text-3xl">
      {project.client ? project.client.name : "Client info not available"}
    </p>
  </div>

              {/* Project Description */}
              {project.description && (
                <p className="text-lg text-center text-gray-400 m-2 mb-4">
                  <strong>Description:</strong> {project.description}
                </p>
              )}

                {/* Project Budget */}
                {project.budget && (
                <div className="mt-2 text-lg font-semibold text-gray-500">
                  <p>
                    <strong>Budget:</strong> ${project.budget}
                  </p>
                </div>
              )}


              {/* Project Status, Budget, and Rating - Aligned horizontally */}
              <div className="mt-4 flex justify-center items-center space-x-8">
                {/* Project Status */}
                <p className="font-semibold text-sm text-gray-500">
                  Status: <span className={`font-bold ${getStatusClass(project.status)}`}>{project.status}</span>
                </p>

                {/* Project Rating */}
                <div className="text-sm text-gray-500">
                  {project.reviews && project.reviews.length > 0
                    ? renderRating(project.reviews)
                    : "No ratings yet"}
                </div>
              </div>

            
              {/* Project Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-gray-400 px-4 py-2 text-sm rounded-full mr-2 mt-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to return the color class for project status
const getStatusClass = (status) => {
  switch (status) {
    case "Not Started":
      return "text-yellow-500";
    case "In Progress":
      return "text-blue-500";
    case "Completed":
      return "text-green-500";
    case "On Hold":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

// Helper function to calculate and render the rating out of 5 stars
// const renderRating = (reviews) => {
//   const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
//   const averageRating = totalRating / reviews.length;

//   const fullStars = Math.floor(averageRating); // Full stars
//   const emptyStars = 5 - fullStars; // Empty stars

//   return (
//     <>
//       {Array(fullStars)
//         .fill("⭐")
//         .map((star, index) => (
//           <span key={`full-${index}`} className="star full text-purple-500" style={{ marginRight: "5px" }}>
//             {star}
//           </span>
//         ))}
//       {Array(emptyStars)
//         .fill("☆")
//         .map((star, index) => (
//           <span key={`empty-${index}`} className="star empty" style={{ marginRight: "5px" }}>
//             {star}
//           </span>
//         ))}
//       {/* <span className="ml-2 text-gray-600">{averageRating.toFixed(1)} / 5</span> */}
//     </>
//   );
// };


// const renderRating = (reviews) => {
//   const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
//   const averageRating = totalRating / reviews.length;

//   const fullStars = Math.floor(averageRating); // Full stars
//   const emptyStars = 5 - fullStars; // Empty stars

//   return (
//     <>
//       {/* Render full stars (filled) */}
//       {Array.from({ length: fullStars }).map((_, index) => (
//         <span
//           key={`full-${index}`}
//           style={{ color: "#8A2BE2", marginRight: "5px", fontSize: "20px" }}  // Purple color
//         >
//           <FaStar />
//         </span>
//       ))}

//       {/* Render empty stars */}
//       {Array.from({ length: emptyStars }).map((_, index) => (
//         <span
//           key={`empty-${index}`}
//           style={{ color: "#D3D3D3", marginRight: "5px", fontSize: "20px" }}  // Light gray color
//         >
//           <FaRegStar />
//         </span>
//       ))}

//       <span className="ml-2 text-gray-600">{averageRating.toFixed(1)} / 5</span>
//     </>
//   );
// };

const renderRating = (reviews) => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const fullStars = Math.floor(averageRating); // Full stars
  const emptyStars = 5 - fullStars; // Empty stars

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* Rating Text */}
      <strong className="text-sm text-gray-500">Rating:</strong>

      {/* Render full stars (filled) */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <span
          key={`full-${index}`}
          style={{
            color: "#d9bae9", // Purple color
            fontSize: "20px",
          }}
        >
          <FaStar />
        </span>
      ))}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span
          key={`empty-${index}`}
          style={{
            color: "#D3D3D3", // Light gray color
            fontSize: "20px",
          }}
        >
          <FaRegStar />
        </span>
      ))}

      {/* Rating Value */}
      {/* <span className="ml-2 text-gray-600">{totalRating} / 5</span> */}
    </div>
  );
};


export default Portfolio;
