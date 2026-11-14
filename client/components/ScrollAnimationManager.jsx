'use client';

import { useEffect, useState } from 'react';

export default function ScrollAnimationManager() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check if browser has native CSS scroll-driven animation support
    const hasNativeScrollTimeline = typeof window !== 'undefined' &&
      window.CSS &&
      window.CSS.supports &&
      window.CSS.supports('animation-timeline', 'scroll()');

    // JS Fallback for browsers without native CSS scroll()
    if (!hasNativeScrollTimeline) {
      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentProgress = window.scrollY / totalHeight;
          setScrollProgress(currentProgress);
          const bar = document.getElementById('scroll-progress-indicator');
          if (bar) {
            bar.style.transform = `scaleX(${currentProgress})`;
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      id="scroll-progress-indicator"
      aria-hidden="true"
      style={{
        transform: `scaleX(${scrollProgress})`,
      }}
    />
  );
}
