// src/hooks/useScrollProgress.js
import { useState, useEffect } from 'react';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, showScrollTop };
};

export default useScrollProgress;