import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios"; // Import axios
import "./Rating.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing FontAwesome stars

const Rating = () => {
  const [testimonials, setTestimonials] = useState([]); // Store the fetched reviews

  // Fetch reviews from the backend API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects/review");
        setTestimonials(response.data); // Set the reviews data to state
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const emptyStars = 5 - fullStars; // Remaining empty stars

    return (
      <div className="flex items-center justify-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar
            key={`full-${index}`}
            style={{
              color: "#d9bae9",
              fontSize: "20px",
              marginRight: "4px",
            }}
          />
        ))}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            style={{
              color: "#D3D3D3",
              fontSize: "20px",
              marginRight: "4px",
            }}
          />
        ))}
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: testimonials.length > 1, // Only enable infinite if there's more than one testimonial
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      className="h-auto flex flex-col items-center justify-center py-4 sm:py-8 px-4"
      style={{
        textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.2)",
      }}
    >
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 glow-text"
        style={{
          textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.7)",
        }}
      >
        Testimonials
      </h1>

      {/* Fallback for empty testimonials */}
      {testimonials.length === 0 ? (
        <p className="text-base sm:text-lg text-center">No testimonials available</p>
      ) : testimonials.length === 1 ? (
        // If there is only one testimonial, render it without Slider
        <div className="testimonial text-center p-4 sm:p-6  rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <img
              className="rounded-full glow-shadow w-16 sm:w-20"
              src={testimonials[0].client?.image || "default-image-path"}
              alt={testimonials[0].projectName}
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">{testimonials[0].projectName}</h2>
          <p className="mb-2">{renderStars(testimonials[0].rating)}</p>
          <p className="text-sm sm:text-base">"{testimonials[0].feedback}"</p>
        </div>
      ) : (
        // If there are multiple testimonials, use the slider
        <div className="rating-slider glow-shadow w-full max-w-4xl">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial text-center p-4 sm:p-6  rounded-lg" key={index}>
                <div className="flex justify-center items-center mb-4">
                  <img
                    className="rounded-full glow-shadow w-16 sm:w-20"
                    src={testimonial.client?.image || "../public/image.png"}
                    alt={testimonial.projectName}
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-2">{testimonial.projectName}</h2>
                <p className="mb-2">{renderStars(testimonial.rating)}</p>
                <p className="text-sm sm:text-base">"{testimonial.feedback}"</p>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Rating;
