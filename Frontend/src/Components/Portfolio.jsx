import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = ({ isVisible }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        console.log(response);
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
      className={`min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors duration-900 ${
        isVisible ? "bg-gradient-to-br from-white to-[#1a1a1a]" : "bg-[#1a1a1a]"
      }`}
    >
      {/* Header */}
      <h1 className="main-heading-glow text-5xl font-bold text-center mb-[24vh] glow-text" style={{
        textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.7)",
      }}>
        Portfolios
      </h1>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
        {projects.map((project) => (
          <div
            key={project._id}
            className="relative p-6 bg-white rounded-3xl shadow-xl border border-gray-200 glow-shadow group hover:scale-105 transition-transform duration-300"
          >
            {/* Background Blur for Glass Effect */}
            <div className="absolute inset-0 bg-cyan-100/10 blur-lg rounded-2xl z-0"></div>
            <div className="absolute inset-0 border border-[#d5a0ef] rounded-2xl opacity-50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold group-hover:text-[#d9bae9]  transition">
                {project.name}
              </h2>
              <p className="mt-2">{project.client ? project.client.name : "Client info not available"}</p> {/* Display the client's name */}
              <p className="mt-2">{project.reviews.length} reviews</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
