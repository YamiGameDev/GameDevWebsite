// src/components/UI/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ scrollProgress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-40">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page scroll progress"
      />
    </div>
  );
};

export default ProgressBar;