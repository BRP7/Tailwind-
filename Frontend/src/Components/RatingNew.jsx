import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";  // Import axios
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <>
        {Array(fullStars)
          .fill("⭐")
          .map((star, index) => (
            <span key={`full-${index}`} className="star full">{star}</span>
          ))}
        {Array(emptyStars)
          .fill("☆")
          .map((star, index) => (
            <span key={`empty-${index}`} className="star empty">{star}</span>
          ))}
      </>
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full p-10 rounded-xl shadow-2xl bg-white relative">
        <h1 className="text-4xl font-extrabold text-center text-[#787C97] mb-4">
          Testimonials
        </h1>

        {/* Fallback for empty testimonials */}
        {testimonials.length === 0 ? (
          <p className="text-lg text-center text-[#9ca3af]">No testimonials available</p>
        ) : testimonials.length === 1 ? (
          // If there is only one testimonial, render it without Slider
          <div className="testimonial text-center">
            <div className="flex justify-center items-center mb-4">
              <img
                className="rounded-full shadow-lg"
                src={testimonials[0].client?.image || "default-image-path"}  // Assuming client has an image
                alt={testimonials[0].projectName}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <h2 className="text-lg font-bold text-[#787C97] mb-2">{testimonials[0].projectName}</h2>
            <p className="mb-4">{renderStars(testimonials[0].rating)}</p>
            <p className="text-[#9ca3af]">"{testimonials[0].feedback}"</p>
          </div>
        ) : (
          // If there are multiple testimonials, use the slider
          <div className="rating-slider">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div className="testimonial text-center" key={index}>
                  <div className="flex justify-center items-center mb-4">
                    <img
                      className="rounded-full shadow-lg"
                      src={testimonial.client?.image || "default-image-path"}  // Assuming client has an image
                      alt={testimonial.projectName}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <h2 className="text-lg font-bold text-[#787C97] mb-2">{testimonial.projectName}</h2>
                  <p className="mb-4">{renderStars(testimonial.rating)}</p>
                  <p className="text-[#9ca3af]">"{testimonial.feedback}"</p>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
