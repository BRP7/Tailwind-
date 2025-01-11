// // // import { useState } from "react";
// import React ,{useState,useEffect} from "react";
// import { Link, useHref } from "react-router-dom";


// // // function Navbar() {
// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         <li style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }}><Link to="/about">About</Link></li>
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }}><Link to="/portfolio">Portfolio</Link></li>
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }}><Link to="/contact">Contact</Link></li>
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }}><Link to="/">Home</Link></li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;


// // // // The issue with the hover effect not working in your Navbar component is likely due to the way CSS is being applied in the inline styles. The &:hover selector syntax is specific to CSS-in-JS libraries like
// // // // styled-components or CSS preprocessors (e.g., Sass), but it doesn't work with plain inline styles in React.
// // // function Navbar() {
// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         <li style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //             transition: "text-shadow 0.3s ease-in-out",
// // //             "&:hover": {
// // //               textShadow: "0 0 15px #699CB9, 0 0 30px #699CB9",
// // //             }
// // //           }}><Link to="/about">About</Link></li>
// // //         <li style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //             transition: "text-shadow 0.3s ease-in-out",
// // //             "&:hover": {
// // //               textShadow: "0 0 15px #699CB9, 0 0 30px #699CB9",
// // //             }
// // //           }}><Link to="/portfolio">Portfolio</Link></li>
// // //         <li style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //             transition: "text-shadow 0.3s ease-in-out",
// // //             "&:hover": {
// // //               textShadow: "0 0 15px #699CB9, 0 0 30px #699CB9",
// // //             }
// // //           }}><Link to="/contact">Contact</Link></li>
// // //         <li style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //             transition: "text-shadow 0.3s ease-in-out",
// // //             "&:hover": {
// // //               textShadow: "0 0 15px #699CB9, 0 0 30px #699CB9",
// // //             }
// // //           }}><Link to="/">Home</Link></li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;

// // // all element get affected by hover effect
// // // function Navbar() {
// // //   const [hovered, setHovered] = React.useState(false);

// // //   const handleMouseEnter = () => setHovered(true);
// // //   const handleMouseLeave = () => setHovered(false);

// // //   const linkStyle = {
// // //     textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //     transition: "text-shadow 0.3s ease-in-out",
// // //     textShadow: hovered ? "0 0 15px #699CB9, 0 0 30px #699CB9" : "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //   };

// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         <li>
// // //           <Link
// // //             to="/about"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             About
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link
// // //             to="/portfolio"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             Portfolio
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link
// // //             to="/contact"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             Contact
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link
// // //             to="/"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             Home
// // //           </Link>
// // //         </li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;

// // //still get affected by the hover effect on the links
// // // function Navbar() {
// // //   const [hovered, setHovered] = React.useState(false);

// // //   const handleMouseEnter = () => setHovered(true);
// // //   const handleMouseLeave = () => setHovered(false);

// // //   const linkStyle = {
// // //     textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //     transition: "text-shadow 0.3s ease-in-out",
// // //     textShadow: hovered ? "0 0 15px #699CB9, 0 0 30px #699CB9" : "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //   };

// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         <li>
// // //           <Link
// // //             to="/about"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             About
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link
// // //             to="/portfolio"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             Portfolio
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link
// // //             to="/contact"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             Contact
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link
// // //             to="/"
// // //             style={linkStyle}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //           >
// // //             Home
// // //           </Link>
// // //         </li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;


// // //back ground getting neonblue not shadow
// // // function Navbar() {
// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         {/* About menu item */}
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }} className="transition-all hover:bg-neonBlue/20 hover:text-whiteGlow px-4 py-2 rounded">
// // //           <Link to="/about">About</Link>
// // //         </li>
        
// // //         {/* Portfolio menu item */}
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }} className="transition-all hover:bg-neonBlue/20 hover:text-whiteGlow px-4 py-2 rounded">
// // //           <Link to="/portfolio">Portfolio</Link>
// // //         </li>
        
// // //         {/* Contact menu item */}
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }} className="transition-all hover:bg-neonBlue/20 hover:text-whiteGlow px-4 py-2 rounded">
// // //           <Link to="/contact">Contact</Link>
// // //         </li>
        
// // //         {/* Home menu item */}
// // //         <li  style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
// // //           }} className="transition-all hover:bg-neonBlue/20 hover:text-whiteGlow px-4 py-2 rounded">
// // //           <Link to="/">Home</Link>
// // //         </li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;




// // // import React from "react";
// // // import { Link } from "react-router-dom";

// // // function Navbar() {
// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-between items-center">
// // //       <h1 className="text-neonBlue text-2xl font-bold">NxtSite</h1>
// // //       <ul className="flex space-x-6 text-lg">
// // //         <li><Link to="/">Home</Link></li>
// // //         <li><Link to="/about">About</Link></li>
// // //         <li><Link to="/portfolio">Portfolio</Link></li>
// // //         <li><Link to="/contact">Contact</Link></li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;



// // // function Navbar() {
// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         {/* About link */}
// // //         <li
// // //           className="transition-all hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9] px-4 py-2 rounded"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // default white glow
// // //           }}
// // //         >
// // //           <Link to="/about">About</Link>
// // //         </li>

// // //         {/* Portfolio link */}
// // //         <li
// // //           className="transition-all hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9] px-4 py-2 rounded"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // default white glow
// // //           }}
// // //         >
// // //           <Link to="/portfolio">Portfolio</Link>
// // //         </li>

// // //         {/* Contact link */}
// // //         <li
// // //           className="transition-all hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9] px-4 py-2 rounded"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // default white glow
// // //           }}
// // //         >
// // //           <Link to="/contact">Contact</Link>
// // //         </li>

// // //         {/* Home link */}
// // //         <li
// // //           className="transition-all hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9] px-4 py-2 rounded"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // default white glow
// // //           }}
// // //         >
// // //           <Link to="/">Home</Link>
// // //         </li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;


// // // function Navbar() {
// // //   return (
// // //     <nav className="w-full fixed top-0 bg-darkGray/80 text-lightGray py-4 px-8 flex justify-center items-center">
// // //       <ul className="flex space-x-6 text-lg">
// // //         {/* About link */}
// // //         <li
// // //           className="transition-all px-4 py-2 rounded hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9]"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // Default white glow
// // //           }}
// // //         >
// // //           <Link to="/about">About</Link>
// // //         </li>

// // //         {/* Portfolio link */}
// // //         <li
// // //           className="transition-all px-4 py-2 rounded hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9]"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // Default white glow
// // //           }}
// // //         >
// // //           <Link to="/portfolio">Portfolio</Link>
// // //         </li>

// // //         {/* Contact link */}
// // //         <li
// // //           className="transition-all px-4 py-2 rounded hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9]"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // Default white glow
// // //           }}
// // //         >
// // //           <Link to="/contact">Contact</Link>
// // //         </li>

// // //         {/* Home link */}
// // //         <li
// // //           className="transition-all px-4 py-2 rounded hover:text-white hover:shadow-[0_0_15px_#699CB9,0_0_30px_#699CB9]"
// // //           style={{
// // //             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8", // Default white glow
// // //           }}
// // //         >
// // //           <Link to="/">Home</Link>
// // //         </li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;



// function Navbar() {

//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {

//     if (location.pathname === "/login") {
//       return null;
//     }
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

  
//   return (
// <nav
//       className={`w-full z-50 fixed top-0 py-4 px-8 flex justify-center items-center transition-all ${
//         isSticky ? "bg-darkGray/80 backdrop-blur-md shadow-lg" : "bg-transparent text-gray-200"
//       }`}
//     >      <ul className="flex space-x-6 text-lg">
//         {/* About link */}
//         <li
//           className=" transition-all px-4 py-2 rounded"
//           style={{
//             textShadow: "0 0 15px #d5a0ef, 0 0 30px #d5a0ef", // Default white glow
//           }}
//         >
//           <Link to="/about" className="hover:text-white">
//             About
//           </Link>
//         </li>

//         {/* Portfolio link */}
//         <li
//           className="transition-all px-4 py-2 rounded"
//           style={{
//             textShadow: "0 0 15px #d5a0ef, 0 0 30px #d5a0ef", // Default white glow
//           }}
//         >
//           <Link to="/portfolio" className="hover:text-white">
//             Portfolio
//           </Link>
//         </li>

//         {/* Contact link */}
//         <li
//           className="transition-all px-4 py-2 rounded"
//           style={{
//             textShadow: "0 0 15px #d5a0ef, 0 0 30px #d5a0ef", // Default white glow
//           }}
//         >
//           <Link to="/contact" className="hover:text-white">
//             Contact
//           </Link>
//         </li>

//         {/* Home link */}
//         <li
//           className="transition-all px-4 py-2 rounded"
//           style={{
//             textShadow: "0 0 15px #d5a0ef, 0 0 30px #d5a0ef", // Default white glow
//           }}
//         >
//           <Link to="/" className="hover:text-white">
//             Home
//           </Link>
//         </li>
//       </ul>
//       <div className="absolute top-4 right-8">
//         <Link to="/login" className="text-lg hover:text-white transition-colors">
//           <i className="fas fa-sign-in-alt hover:shadow-xl hover:shadow-[#d9bae9]"></i>
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const [isSticky, setIsSticky] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     // Check if the user is logged in by looking for a token in localStorage
//     const token = localStorage.getItem("token");
//     console.log(token);
//     setIsLoggedIn(token);
//   }, []);

//   return (
//     <nav
//       className={`w-full z-50 fixed top-0 ${
//         isSticky ? "bg-darkGray/80 backdrop-blur-md shadow-lg" : "bg-darkGray/80"
//       } text-lightGray py-4 px-6 flex items-center justify-between transition-all`}
//     >
//       {/* Centered Navbar Menu */}
//       <ul className="flex space-x-6 md:space-x-8 lg:space-x-12 text-sm md:text-base lg:text-lg ml-auto">
//         <li
//           style={{
//             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
//           }}
//           className="transition-all hover:text-white px-2"
//         >
//           <Link to="/about">About</Link>
//         </li>
//         <li
//           style={{
//             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
//           }}
//           className="transition-all hover:text-white px-2"
//         >
//           <Link to="/portfolio">Portfolio</Link>
//         </li>
//         <li
//           style={{
//             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
//           }}
//           className="transition-all hover:text-white px-2"
//         >
//           <Link to="/contact">Contact</Link>
//         </li>
//         <li
//           style={{
//             textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
//           }}
//           className="transition-all hover:text-white px-2"
//         >
//           <Link to="/">Home</Link>
//         </li>
//       </ul>

//       {/* Login/Profile Icon */}
//       <div className="ml-auto">
//         {isLoggedIn ? (
//           <Link
//             to="/profile"
//             className="text-lg hover:text-white transition-colors"
//             aria-label="Profile"
//           >
//             <i className="fas fa-user-circle hover:shadow-xl hover:shadow-[#d9bae9]"></i>
//           </Link>
//         ) : (
//           <Link
//             to="/login"
//             className="text-lg hover:text-white transition-colors"
//             aria-label="Login"
//           >
//             <i className="fas fa-sign-in-alt hover:shadow-xl hover:shadow-[#d9bae9]"></i>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(token);
  }, []);

  return (
    <nav
      className={`w-full z-50 fixed top-0 ${
        isSticky ? "bg-darkGray/80 backdrop-blur-md shadow-lg text-gray-700" : "bg-darkGray/80"
      } text-lightGray py-4 px-6 flex items-center justify-between transition-all`}
    >
      <ul className="flex space-x-6 md:space-x-8 lg:space-x-12 text-sm md:text-base lg:text-lg ml-auto">
        <li
          style={{
            textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
          }}
          className="transition-all hover:text-white px-2"
        >
          <a href="#about">About</a>
        </li>
        <li
          style={{
            textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
          }}
          className="transition-all hover:text-white px-2"
        >
          <a href="#portfolio">Portfolio</a>
        </li>
        <li
          style={{
            textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
          }}
          className="transition-all hover:text-white px-2"
        >
          <a href="#contact">Contact</a>
        </li>
        <li
          style={{
            textShadow: "0 0 15px #FCFDF8, 0 0 30px #FCFDF8",
          }}
          className="transition-all hover:text-white px-2"
        >
          <a href="#home">Home</a>
        </li>
      </ul>

      <div className="ml-auto">
        {isLoggedIn ? (
          <a href="/profile" className="text-lg hover:text-white transition-colors">
            <i className="fas fa-user-circle hover:shadow-xl hover:shadow-[#d9bae9]"></i>
          </a>
        ) : (
          <a href="/login" className="text-lg hover:text-white transition-colors">
            <i className="fas fa-sign-in-alt hover:shadow-xl hover:shadow-[#d9bae9]"></i>
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


