// src/hooks/useScrollLockTrigger.jsx
import { useEffect, useState } from 'react';

export const useScrollLockTrigger = (isFullyInView) => {
  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    if (isFullyInView) {
      document.documentElement.classList.add('scroll-lock');
      setScrollLocked(true);
    } else {
      document.documentElement.classList.remove('scroll-lock');
      setScrollLocked(false);
    }
  }, [isFullyInView]);

  return scrollLocked;
};
