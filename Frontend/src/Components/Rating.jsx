import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";  // Import axios
import "./Rating.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing FontAwesome stars


const Rating = () => {
  const [testimonials, setTestimonials] = useState([]);  // Store the fetched reviews

  // Fetch reviews from the backend API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects/review");
        console.log("Fetched testimonials:", response.data); // Check the response structure
        setTestimonials(response.data);  // Set the reviews data to state
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);  // Empty dependency array to fetch data once on component mount

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);  // Full stars
    const emptyStars = 5 - fullStars;  // Remaining empty stars
  
    return (
      <div className="flex items-center justify-center">
        {/* Render filled stars (purple color) */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar
            key={`full-${index}`}
            style={{
              color: "#d9bae9",
              fontSize: "20px",
              marginRight: "5px",
            }}
          />
        ))}
        
        {/* Render empty stars (light gray color) */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            style={{
              color: "#D3D3D3", // Light gray color for empty stars
              fontSize: "20px", // Font size of stars
              marginRight: "5px", // Space between stars
            }}
          />
        ))}
      </div>
    );
  };
  


  const settings = {
    dots: true,
    infinite: testimonials.length > 1,  // Only enable infinite if there's more than one testimonial
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      className="min-h-screen justify-center m-2 p-8"
      style={{
        textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.2)",
      }}
    >
      <h1
        className="text-5xl font-bold text-center mb-[5rem] glow-text"
        style={{
          textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.7)",
        }}
      >
        Testimonials
      </h1>

      {/* Fallback for empty testimonials */}
      {testimonials.length === 0 ? (
        <p>No testimonials available</p>
      ) : testimonials.length === 1 ? (
        // If there is only one testimonial, render it without Slider
        <div className="testimonial">
          <div className="flex justify-center items-center">
            <img
              className="rounded-full glow-shadow"
              src={testimonials[0].client?.image || "default-image-path"}  // Assuming client has an image
              alt={testimonials[0].projectName}
            />
          </div>
          <h2>{testimonials[0].projectName}</h2>
          <p>{renderStars(testimonials[0].rating)}</p>
          <p>"{testimonials[0].feedback}"</p>
        </div>
      ) : (
        // If there are multiple testimonials, use the slider
        <div className="rating-slider glow-shadow">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={index}>
                <div className="flex justify-center items-center">
                  <img
                    className="rounded-full glow-shadow"
                    // src={testimonial.client?.image || "default-image-path"}  // Assuming client has an image
                    src={ "../public/image.png"}  // Assuming client has an image
                    alt={testimonial.projectName}
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">{testimonial.projectName}</h2>
                <p>{renderStars(testimonial.rating)}</p>
                <p className="text-sm md:text-base">{testimonial.feedback}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Rating;
