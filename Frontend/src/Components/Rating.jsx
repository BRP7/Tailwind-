import React from "react";
import Slider from "react-slick";
import "./Rating.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Rating = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="min-h-screen justify-center m-8 p-8" style={{textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.9)"}}>
      <h1
        className="text-5xl font-bold text-center mb-[5rem] glow-text"
        style={{textShadow: "0 4px 35px rgba(0, 0, 0, 0.2), 0 0 50px rgba(128, 0, 128, 0.9)"}}
      >
        Testimonials
      </h1>
      <div className="rating-slider">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
            <div className="flex justify-center items-center">
  <img
    style={{
      boxShadow: "0 4px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(128, 0, 128, 0.7)",
    }}
    className="rounded-full"
    src={testimonial.image}
    alt={testimonial.projectName}
  />
</div>

              <h2>{testimonial.projectName}</h2>
              <p>{testimonial.rating}</p>
              <p>"{testimonial.feedback}"</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Rating;
