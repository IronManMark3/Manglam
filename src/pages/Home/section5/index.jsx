import React from 'react';
import SlideBackground from './SlideBackground';
import ContentSlider from './ContentSlider';

const NUM_SLIDES = 7;

const Section2 = ({ currentSlide, setCurrentSlide, isActive }) => {
  return (
    <div
    id="section2-scroll-zone" className={`w-full h-screen transition-all duration-500 ${isActive ? 'fixed top-0 left-0 z-50 w-full h-screen' : 'absolute top-0 left-0 w-full h-screen'}
`}
    >
      <SlideBackground currentSlide={currentSlide} />
      <ContentSlider
        activeSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isActive={isActive}
      />

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 pointer-events-auto">
        {Array.from({ length: NUM_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === i
                ? 'bg-white opacity-90'
                : 'bg-white opacity-50 hover:opacity-70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Section2;
