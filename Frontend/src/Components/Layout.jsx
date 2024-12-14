import React from "react";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-lightGray flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-10">
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className="bg-neonBlue"></div>
        ))}
      </div>
      {children}
    </div>
  );
}

export default Layout;
