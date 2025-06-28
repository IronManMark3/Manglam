// src/pages/Home/section2.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useInView } from '../../components/hooks/useInView';
import CountUp from 'react-countup';
import { Typewriter } from 'react-simple-typewriter';

const stats = [
  { label: 'Years of Legacy', count: 27, suffix: '+' },
  { label: 'Successful Projects', count: 87, suffix: '+' },
  { label: 'Happy Families', count: 35000, suffix: '+' },
  { label: 'SQ.FT. Delivered', count: 518, suffix: ' lac' },
];

const headingLines = [
  {
    words: [
      { text: 'Our', font: 'Mackay Regular' },
      { text: 'journey', font: 'Mackay bolditalic' },
    ],
    margin: 'ml-0',
  },
  {
    words: [
      { text: 'reflects', font: 'Mackay Regular' },
      { text: 'in', font: 'Mackay Regular' },
    ],
    margin: 'ml-60',
  },
  {
    words: [
      { text: 'numbers', font: 'Mackay bolditalic' },
    ],
    margin: 'ml-96',
  },
];

const Section2 = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.15 });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (isInView && visibleLines < headingLines.length) {
      const delay = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(delay);
    }
  }, [isInView, visibleLines]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center px-6 md:px-10 bg-transparent"
    >
      <div className="w-full max-w-7xl flex flex-col items-start justify-start">
        {/* Typing Heading with selective font per word */}
        <div className="space-y-3 mb-12 self-center">
          <h2 className="text-[2rem] md:text-[5rem] text-[#222] leading-none">
            {headingLines.map((line, index) => (
              <div key={index} className={line.margin}>
                {index < visibleLines && (
                  <div className="flex flex-wrap gap-x-2">
                    {line.words.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        style={{
                          fontFamily: `"${word.font}"`,
                          fontStyle: word.font.includes('italic') ? 'italic' : 'normal',
                          marginRight: wIdx < line.words.length - 1 ? '0.25em' : '0',
                        }}
                      >
                        <Typewriter
                          words={[word.text]}
                          cursor={false}
                          typeSpeed={45}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </h2>
        </div>

        {/* Stats + Subtext */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Floating Stats */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-full md:w-1/2">
            {stats.map((item, index) => (
              <div
                key={index}
                className="text-left animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
  className="text-4xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#5e1900] via-[#9b4c00] to-[#f7c565]"
  style={{ fontFamily: '"Mackay Medium", italic' }}
>

                  {isInView ? (
                    <CountUp end={item.count} duration={1.5} suffix={item.suffix} />
                  ) : (
                    `0${item.suffix}`
                  )}
                </div>
                <div className="text-sm uppercase tracking-wide text-[#444] mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Subtext beside the stats */}
          <div className="w-full md:w-1/2 flex items-center">
            <p
              className="font-[poppins] text-[1.15rem] md:text-[1.5rem] text-[#222] font-light"
            >
              For over 30 years, Manglam Group has been Rajasthan’s largest and most trusted real estate brand. Our journey, enriched by the delivery of over 80 successful projects across 15 vibrant cities, is a testament to our commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
