let isScrolling = false;

export const scrollThrottle = (callback, delay = 1000) => {
  if (isScrolling) return;
  isScrolling = true;
  callback();
  setTimeout(() => {
    isScrolling = false;
  }, delay);
};
