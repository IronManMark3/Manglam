import React, { useEffect } from 'react';

const SlideBackground = ({ currentSlide }) => {
  const NUM_SLIDES = 7;

  const slideImages = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
    '/images/slide4.png',
    '/images/slide5.jpg',
    '/images/slide6.jpg',
    '/images/slide7.png',
  ];

  // 🔄 Preload all images once on mount
  useEffect(() => {
    slideImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      className="absolute top-0 left-0 flex transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateX(-${currentSlide * 100}vw)`,
        width: `${NUM_SLIDES * 100}vw`,
      }}
    >
      {slideImages.map((image, i) => (
        <div
          key={i}
          className="w-screen h-screen flex-shrink-0"
        >
          <img
            src={image}
            alt={`Slide ${i + 1}`}
            loading="eager" // ✅ Forces immediate load
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default SlideBackground;
