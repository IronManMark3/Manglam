// src/pages/Home/index.jsx
import React, { useRef, useState } from 'react';
import Header from '../../components/common/Header';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
import Section5 from './section5';
import { useInView } from '../../components/hooks/useInView';
import { useScrollLockTrigger } from '../../components/hooks/useScrollLockTrigger';

const Home = () => {
  const section5Ref = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0); // ✅ Needed for Section5
  const isFullyInView = useInView(section5Ref);        // ✅ Only tied to Section5
  const scrollLocked = useScrollLockTrigger(isFullyInView); // ✅ Only for header/Section5

  return (
    <>
      <Header scrollLocked={scrollLocked} />

      <Section1 />
      <Section2 />
      <Section3 /> {/* ✅ Now uses new logic internally */}
      <Section4 />

      <div ref={section5Ref} style={{ height: '95vh', position: 'relative' }}>
        <Section5
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isActive={scrollLocked}
        />
      </div>
    </>
  );
};

export default Home;
