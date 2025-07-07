// src/components/UI/ScrollToTop.jsx
import React from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = ({ show, reducedMotion }) => {
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      className={`fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg ${!reducedMotion ? 'hover:scale-110' : ''} transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
      aria-label="Scroll to top of page"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;