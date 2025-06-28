import { useState, useEffect } from 'react';

export const useInView = (elementRef, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.95, // Only default to 0.95 if not provided
        ...options,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isInView;
};
