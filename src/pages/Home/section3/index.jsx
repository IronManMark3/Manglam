import React, { useEffect, useRef, useState } from 'react';
import section3Data from './data';
import { useInView } from '../../../components/hooks/useInView';

const Section3 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleText, setVisibleText] = useState(null);
  const [showText, setShowText] = useState(false);
  const [fadeText, setFadeText] = useState(true);

  const imageRefs = useRef([]);
  const sectionRef = useRef(null);

  // ✅ Detect if section3 is in the viewport
  const sectionInView = useInView(sectionRef, { threshold: 0.1 });

  // ✅ Watch section visibility to fade entire text container
  useEffect(() => {
    setShowText(sectionInView);
  }, [sectionInView]);

  // ✅ Handle text change based on image visibility
  useEffect(() => {
    const handleScroll = () => {
      let foundVisible = false;
      let newIndex = activeIndex;

      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const visibleHeight = Math.min(rect.height, window.innerHeight - rect.top);
        const visiblePercent = Math.max(0, visibleHeight / rect.height);

        if (visiblePercent >= 0.65) {
          newIndex = index;
          foundVisible = true;
        }
      });

      if (foundVisible && newIndex !== activeIndex) {
        setFadeText(false);
        setTimeout(() => {
          setActiveIndex(newIndex);
          setFadeText(true);
        }, 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  // ✅ Update visible text when index changes
  useEffect(() => {
    if (activeIndex !== null) {
      setVisibleText(section3Data[activeIndex]);
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[700vh]">
      {/* Fixed Left Text */}
      <div
        className={`fixed top-0 left-0 w-[40%] h-screen flex items-center justify-center p-10 z-10 transition-opacity duration-700 ease-in-out ${
          showText ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            fadeText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {visibleText && (
            <>
              <h2
                className="text-[2rem] md:text-[3.5rem] leading-tight text-[#111]"
                style={{ fontFamily: '"Mackay italic"' }}
              >
                {visibleText.heading}
              </h2>
              <p
                className="mt-4 text-[1.1rem] md:text-[1.35rem] text-[#444]"
                style={{ fontFamily: '"Mackay Regular"' }}
              >
                {visibleText.subtext}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right-side Image Stack */}
      <div className="ml-[40%] w-[60%]">
        <div className="relative" style={{ height: `${section3Data.length * 100}vh` }}>
          {section3Data.map((item, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="h-screen w-full"
            >
              <img
                src={item.image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
