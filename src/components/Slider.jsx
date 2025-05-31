import React, { useState, useEffect } from 'react';
import '../styles/section-1.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [
    { image: '/img/Slide_1.jpg', alt: 'Slide 1' },
    { image: '/img/Slide_2.jpg', alt: 'Slide 2' },
    { image: '/img/Slide_3.jpg', alt: 'Slide 3' },
    { image: '/img/Slide_4.jpg', alt: 'Slide 4' },
  ];

  useEffect(() => {
    if (!isPaused) {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container"
    onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      >
      <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
        {/* &#10094; */}❮
      </button>
      <button className="next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
        {/* &#10095; */}❯
      </button>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;  