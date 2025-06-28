import React, { useEffect, useRef, useState } from 'react';
import { scrollThrottle } from './scrollLogic';

const NUM_SLIDES = 7;

const slides = [
  {
    title: 'Residential Apartments',
    desc: 'Elevate your living experience with our exquisite residential flats, where luxury meets comfort and every detail is crafted for your perfect home.',
  },
  {
    title: 'Commercial Spaces',
    desc: 'Explore our portfolio of innovative commercial projects that redefine spaces and elevate experiences',
  },
  {
    title: 'Industrial Townships',
    desc: 'Where Infrastructure Meets Opportunity.Purpose-built industrial hubs designed for seamless operations, efficient logistics, and sustainable growth — ideal for manufacturing, warehousing, and long-term business investments.',
  },
  {
    title: 'Integrated Townships',
    desc: 'Everything You Need, Just Steps Away. A self-contained world of homes, schools, shops, parks, and offices—crafted to create vibrant communities with unmatched convenience and connectivity.',
  },
  {
    title: 'Residential Townships',
    desc: 'Modern Living in Thoughtfully Planned Communities. Experience everyday comfort in self-sufficient neighborhoods with wide roads, green spaces, amenities, and homes designed for today’s evolving lifestyles.',
  },
  {
    title: 'Farmhouse',
    desc: 'Your Weekend, Reimagined Amidst Nature. Sprawling plots in lush surroundings, offering a perfect escape for leisure, luxury, and legacy—just a short drive from the city.',
  },
  {
    title: 'Villas',
    desc: 'Signature Living, One Villa at a Time. Private, spacious villas crafted with premium finishes, landscaped gardens, and lifestyle amenities that offer a blend of elegance and exclusivity.',
  },
];

const ContentSlider = ({ activeSlide, setCurrentSlide, isActive }) => {
  const titleBoxRef = useRef(null);
  const descBoxRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const handleWheel = (e) => {
    if (!isActive || !scrollEnabled) return;

    const goingDown = e.deltaY > 0;
    const goingUp = e.deltaY < 0;

    scrollThrottle(() => {
      if (goingDown) {
        if (activeSlide === NUM_SLIDES - 1) {
          // On last slide, allow scroll down to unlock
          document.documentElement.classList.remove('scroll-lock');
        } else {
          setCurrentSlide((prev) => Math.min(prev + 1, NUM_SLIDES - 1));
        }
      } else if (goingUp) {
        if (activeSlide === 0) {
          // On first slide, allow scroll up to unlock
          document.documentElement.classList.remove('scroll-lock');
        } else {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
      }
    });
  };

  useEffect(() => {
    if (isActive) {
      setScrollEnabled(false);
      const timer = setTimeout(() => setScrollEnabled(true), 300);
      return () => clearTimeout(timer);
    } else {
      setScrollEnabled(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSlide, isActive, scrollEnabled]);

  useEffect(() => {
    // Pin scroll lock visually and disable vertical scroll
    document.body.style.overflow = (!isActive || activeSlide === 0 || activeSlide === NUM_SLIDES - 1)
      ? 'auto'
      : 'hidden';
  }, [activeSlide, isActive]);

  useEffect(() => {
    const parentWidth = titleBoxRef.current?.parentElement?.offsetWidth || 0;
    const trackWidth = parentWidth - 300;
    const offset = (trackWidth * activeSlide) / (NUM_SLIDES - 1);
    if (titleBoxRef.current && descBoxRef.current) {
      titleBoxRef.current.style.transform = `translateX(${offset}px)`;
      descBoxRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [activeSlide]);

  const slide = slides[activeSlide];

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <div className="relative w-full h-full">
        {/* Track rail */}
        <div className="absolute top-1/2 left-1/2 w-[80%] h-2 bg-white -translate-x-1/2 -translate-y-1/2 z-20" />

        {/* Title box */}
        <div
          ref={titleBoxRef}
          className="absolute bottom-1/2 left-0 w-[300px] pointer-events-auto z-10 transition-transform duration-700 ease-in-out"
        >
          <div className="bg-black-200/60 p-6 shadow-xl text-center w-full backdrop-blur-lg">
            <h2 className="text-5xl font-[font-serif] text-white leading-tight">
              {slide.title}
            </h2>
          </div>
        </div>

        {/* Description box */}
        <div
          ref={descBoxRef}
          className="absolute top-1/2 left-0 w-[300px] pointer-events-auto z-10 transition-transform duration-700 ease-in-out"
        >
          <div className="bg-black-200/60 p-6 shadow-xl text-center w-full backdrop-blur-lg">
            <p className="text-white text-base leading-relaxed">{slide.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;
