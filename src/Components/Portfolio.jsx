import React from "react";

const Portfolio = () => {
  const projects = [
    { id: 1, title: "Project Alpha", description: "AI-powered solution for modern problems.AI-powered solution for modern problems.AI-powered solution for modern problems.AI-powered solution for modern problems.AI-powered solution for modern problems." },
    { id: 2, title: "Project Beta", description: "A futuristic platform revolutionizing industries.A futuristic platform revolutionizing industries.A futuristic platform revolutionizing industries.A futuristic platform revolutionizing industries.A futuristic platform revolutionizing industries.A futuristic platform revolutionizing industries." },
    { id: 3, title: "Project Gamma", description: "Blockchain-driven innovation at its core.Blockchain-driven innovation at its core.Blockchain-driven innovation at its core.Blockchain-driven innovation at its core.Blockchain-driven innovation at its core.Blockchain-driven innovation at its core." },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0">
        <div className="grid grid-cols-12 gap-4 h-full w-full opacity-10">
          {Array(12)
            .fill("")
            .map((_, i) => (
              <div key={i} className="border border-cyan-500/20"></div>
            ))}
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-cyan-400 mb-12 z-10">
        My Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative bg-transparent border border-cyan-500/50 rounded-lg shadow-lg p-6 group hover:scale-105 transition-all duration-300"
          >
            {/* Neon-glass effect */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-md rounded-lg z-0"></div>
            <div className="absolute inset-0 border border-cyan-500 rounded-lg opacity-50 animate-pulse z-0"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-cyan-300 group-hover:text-cyan-400 transition">
                {project.title}
              </h2>
              <p className="text-cyan-200 mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
