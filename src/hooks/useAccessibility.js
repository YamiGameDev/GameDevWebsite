// src/hooks/useAccessibility.js
import { useState, useEffect } from 'react';

const useAccessibility = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(highContrastQuery.matches);
    
    const handleContrastChange = (e) => setHighContrast(e.matches);
    highContrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      highContrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const toggleReducedMotion = () => setReducedMotion(!reducedMotion);
  const toggleHighContrast = () => setHighContrast(!highContrast);

  return {
    reducedMotion,
    highContrast,
    toggleReducedMotion,
    toggleHighContrast
  };
};

export default useAccessibility;