// import React from "react";

// function App() {
//   return (
//     <div className="min-h-screen bg-lightGray flex items-center justify-center">
//       {/* Main Container */}
//       <div className="relative w-full max-w-6xl p-6 flex flex-col items-center">
//         {/* Background Grid and Lines */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-lightGray via-white to-lightGray opacity-10"></div>
//           <div className="grid grid-cols-12 h-full w-full absolute gap-2">
//             {[...Array(12)].map((_, idx) => (
//               <div key={idx} className="h-full bg-neonBlue opacity-10"></div>
//             ))}
//           </div>
//         </div>


//         {/* Glowing Logo */}
//         <h1
//           className="text-6xl font-bold text-white text-center z-10 mb-16"
//           style={{
//             textShadow: "0 0 15px #00d4ff, 0 0 30px #00d4ff",
//           }}
//         >
//           nxtsite
//         </h1>

//         {/* Floating Objects */}
//         <div className="relative z-10 grid grid-cols-3 gap-6 w-full">
//           {/* Orb Elements */}
//           <div className="h-16 w-16 bg-neonBlue rounded-full shadow-glow animate-pulse"></div>
//           <div className="h-24 w-24 bg-white rounded-full shadow-glow animate-pulse"></div>
//           <div className="h-16 w-16 bg-lightGray rounded-full"></div>

//           {/* Abstract Blocks */}
//           <div className="h-32 w-16 bg-lightGray shadow-glow"></div>
//           <div className="h-16 w-32 bg-lightGray shadow-glow"></div>
//           <div className="h-24 w-24 bg-lightGray shadow-glow"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;











import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
// import About from "./Components/About";
import Contact from "./Components/Contact";
import Rating from "./Components/Rating";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



export default function App(){

  const testimonials = [
    {
      image: "myimag.png",
      projectName: "Project One",
      rating: "⭐⭐⭐⭐⭐",
      feedback: "This project is amazing! Highly recommend.",
    },
    {
      image: "myimag.png",
      projectName: "Project Two",
      rating: "⭐⭐⭐⭐",
      feedback: "Great experience working on this!",
    },
    {
      image: "myimag.png",
      projectName: "Project Three",
      rating: "⭐⭐⭐⭐⭐",
      feedback: "Exceeded all my expectations!",
    },
    {
      image: "myimag.png",
      projectName: "Project Four",
      rating: "⭐⭐⭐⭐⭐",
      feedback: "Wonderful collaboration, loved the result!",
    },
    {
      image: "myimag.png",
      projectName: "Project Five",
      rating: "⭐⭐⭐⭐",
      feedback: "Really good work and easy to communicate!",
    },
  ];

  return(
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/Landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
      <Landing/>
      <Portfolio/>
      <Rating testimonials={testimonials} />
      <About/>
      <Contact/>
      <Footer/>
      
    </>
  )
}
