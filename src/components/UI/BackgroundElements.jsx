// src/components/UI/BackgroundElements.jsx
import React from 'react';

const BackgroundElements = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
    </div>
  );
};

export default BackgroundElements;