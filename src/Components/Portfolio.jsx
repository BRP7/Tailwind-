import React from "react";

const Portfolio = () => {
  const projects = [
    { id: 1, title: "Project Alpha", description: "Advanced AI-driven app." },
    { id: 2, title: "Project Beta", description: "Futuristic web platform." },
    { id: 3, title: "Project Gamma", description: "Cutting-edge blockchain app." },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-12">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/10 backdrop-blur-md border border-cyan-400 shadow-lg rounded-lg p-6 group hover:shadow-cyan-400 transition-all duration-300 relative"
          >
            {/* Glass effect */}
            <div className="absolute inset-0 bg-white/5 rounded-lg blur-sm"></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold text-cyan-300 group-hover:text-cyan-400 transition-all">
                {project.title}
              </h2>
              <p className="text-cyan-200 mt-2 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
