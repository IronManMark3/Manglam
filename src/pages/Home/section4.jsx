// src/pages/Home/section4.jsx
import React from "react";

const Section4 = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <video
        className="w-full h-screen object-cover bg-black"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Section4;
