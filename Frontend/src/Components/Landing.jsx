import React from "react";

function Landing() {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <img
        src="/image.jpg"
        alt="Landing"
        className="w-screen h-auto" // Ensures image takes full width and adjusts height proportionally
      />
    </div>
  );
}

export default Landing;
