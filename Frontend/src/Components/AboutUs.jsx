import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full p-10 rounded-xl shadow-2xl bg-white relative">
        <h1 className="text-4xl font-extrabold text-center text-[#787C97] mb-4">
          About NxtSite
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8 text-[#9ca3af]">
          We create amazing portfolio websites that help our clients stand out in this noisy digital world. Our goal is to transform your digital presence into something truly special and unforgettable.
        </p>
        
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
