import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl w-full p-12 bg-white rounded-3xl shadow-xl border border-gray-200 glow-shadow relative">
        <h1 className="text-5xl font-extrabold text-center mb-6 glow-text" style={{textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.9)"}}>
          About NxtSite
        </h1>
        <p className="text-lg leading-relaxed text-center  mb-8">
          We create amazing portfolio websites that help our clients stand out in this noisy digital world. Our goal is to transform your digital presence into something truly special and unforgettable.
        </p>
        <div className="mt-10 text-center">
          <button
            className="px-8 py-4 bg-transparent border border-[#d5a0ef] text-[#d9bae9] font-semibold rounded-full hover:bg-[#d9bae9] hover:text-grayBlue transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
