import React, { useState, useEffect } from "react";
import "../styles/section-1.css";
import "../styles/section-3.css";

const AboutSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "/img/Kinaav.jpg", alt: "Kinaav Brand" },
    { image: "/img/Adam_n_eve.jpg", alt: "Adam and Eve Brand" },
    { image: "/img/69_logo.jpg", alt: "SR69 Brand" },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  return (
    <section className="thirdSection">
      <h2>About Us</h2>
      <div className="about-container">
        <div className="slider-container-2">
          <div
            className="slider-2"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="slides">
                <img src={slide.image} alt={slide.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="about-content">
          <h3>Welcome to Kinaav</h3>
          <p className="mission">
            Bringing fashion to life with our premium brands
          </p>
          <p className="description">
            Kinaav is a renowned company manufacturing for international
            retailers, featuring exclusive brands like Adam & Eve and SR69. We
            offer a unique blend of casual and high fashion clothing, including
            trendy women's wear and comfortable men's sportswear.
          </p>

          <div className="brands-showcase">
            <div className="brand">
              <h4>Kinaav</h4>
              <p>Premium Fashion</p>
            </div>
            <div className="brand">
              <h4>Adam & Eve</h4>
              <p>Luxury Wear</p>
            </div>
            <div className="brand">
              <h4>Swastik Retail</h4>
              <p>Sport Wear</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat-item">
              <h4>1000+</h4>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <h4>500+</h4>
              <p>Customers</p>
            </div>
            <div className="stat-item">
              <h4>3</h4>
              <p>Brands</p>
            </div>
          </div>

          <button className="learn-more">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
