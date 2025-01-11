import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
// import About from "./Components/About";
import Contact from "./Components/Contact";
import Rating from "./Components/Rating";
// import LoginRegisterPage from "./Components/LoginRegisterPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



export default function Normal(){

  // const testimonials = [
  //   {
  //     image: "myimag.png",
  //     projectName: "Project One",
  //     rating: "⭐⭐⭐⭐⭐",
  //     feedback: "This project is amazing! Highly recommend.",
  //   },
  //   {
  //     image: "myimag.png",
  //     projectName: "Project Two",
  //     rating: "⭐⭐⭐⭐",
  //     feedback: "Great experience working on this!",
  //   },
  //   {
  //     image: "myimag.png",
  //     projectName: "Project Three",
  //     rating: "⭐⭐⭐⭐⭐",
  //     feedback: "Exceeded all my expectations!",
  //   },
  //   {
  //     image: "myimag.png",
  //     projectName: "Project Four",
  //     rating: "⭐⭐⭐⭐⭐",
  //     feedback: "Wonderful collaboration, loved the result!",
  //   },
  //   {
  //     image: "myimag.png",
  //     projectName: "Project Five",
  //     rating: "⭐⭐⭐⭐",
  //     feedback: "Really good work and easy to communicate!",
  //   },
  // ];

  return(
    <>
    {/* <Router>
    </Router> */}
      <Navbar />
      <Landing id="home" />
      <Portfolio id="portfolio" />
      <Rating  />
      <About id="about" />
      <Contact id="contact" />
      <Footer />
    </>
  )
}
  