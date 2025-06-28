import React, { useEffect, useState } from 'react';

const Header = ({ scrollLocked }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 100); // one-time slide-in
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const section1Height = window.innerHeight;

      // ✅ Always show in Section1
      if (currentScrollY < section1Height) {
        setShowHeader(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // ✅ Hide if scroll lock is active in Section2
      if (scrollLocked) {
        setShowHeader(false);
        return;
      }

      // ✅ Only process on significant movement
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const diff = currentScrollY - lastScrollY;

          if (Math.abs(diff) < 10) {
            // Small jitter, do nothing
            ticking = false;
            return;
          }

          const newDirection = diff > 0 ? 'down' : 'up';
          setScrollDirection(newDirection);

          // ✅ Final logic: show only when scrolling up
          setShowHeader(newDirection === 'up');

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollLocked]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-700 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
        }}
      />

      {/* Header content */}
      <div
        className={`max-w-[1440px] mx-auto px-6 py-10 flex items-center justify-between text-white ${
          firstLoad ? 'animate-slideInDown' : ''
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/manglam_logo.png"
            alt="Logo"
            className="h-12 w-auto ml-20"
          />
        </div>

        {/* Search bar */}
        <div className="flex-1 px-10">
          <div className="w-full max-w-[280px] mx-auto flex items-center border border-white/50 rounded-full px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder-white focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm pr-[30px]">
          <span className="cursor-pointer hover:underline">New Launches</span>
          <span className="cursor-pointer hover:underline">Residential Projects</span>
          <span className="cursor-pointer hover:underline">About Us</span>
          <span className="cursor-pointer hover:underline">Media</span>
          <span className="cursor-pointer hover:underline">Contact</span>
          <span className="cursor-pointer hover:underline">Ask Manglam</span>
          <span className="cursor-pointer hover:underline">ENG</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
