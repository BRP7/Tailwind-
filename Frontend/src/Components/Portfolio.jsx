import React from "react";

const Portfolio = ({ isVisible }) => {
  const projects = [
    { id: 1, title: "Project Alpha", description: "AI-powered solution for modern problems." },
    { id: 2, title: "Project Beta", description: "A futuristic platform revolutionizing industries." },
    { id: 3, title: "Project Gamma", description: "Blockchain-driven innovation at its core." },
  ];

  return (
    <div
      id="portfolio"
      className={`min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors duration-700 ${
        isVisible ? "bg-gradient-to-br from-white to-gray-100" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-[24vh] glow-text" style={{ textShadow: "0 0 20px #CDF3FB, 0 0 30px #00d4ff" }}>
        Portfolios
      </h1>

      {/* Status Bar
      <div className="absolute top-8 text-4xl font-extrabold mb-8 uppercase text-cyan-500 animate-pulse">
        Project
      </div> */}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative p-6 bg-white rounded-3xl shadow-xl border border-gray-200 glow-shadow group hover:scale-105 transition-transform duration-300"
          >
            {/* Background Blur for Glass Effect */}
            <div className="absolute inset-0 bg-cyan-100/10 blur-lg rounded-2xl z-0"></div>
            <div className="absolute inset-0 border border-cyan-400 rounded-2xl opacity-50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold group-hover:text-cyan-800 transition">
                {project.title}
              </h2>
              <p className="mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
