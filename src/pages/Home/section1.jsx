// src/pages/Home/section1.jsx
import React, { useEffect, useState } from "react";

const images = [
  '/images/slide1.jpg',
  '/images/manglam2.jpg',
  '/images/manglam3.jpg',
  '/images/manglam4.jpg',
];

const Section1 = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 100000000000000000); // placeholder duration
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden p-0 m-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 transition-all duration-1000">
        <img
          src={images[current]}
          alt="Manglam Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom-Aligned Text */}
      <div className="absolute bottom-[-1vh] left-1/2 transform -translate-x-1/2 z-10 leading-none">
        <h1
          className="text-[#fefaf6] tracking-[0.15em]"
          style={{
            fontFamily: '"Mackay Medium", sans-serif',
            fontSize: '25vh',
            lineHeight: '0.75',
            textTransform: 'uppercase',
            margin: 0,
            padding: 0,
            fontStyle: 'italic',
          }}
        >
          MANGLAM
        </h1>
      </div>
    </section>
  );
};

export default Section1;
