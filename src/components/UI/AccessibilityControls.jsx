// src/components/UI/AccessibilityControls.jsx
import React from 'react';

const AccessibilityControls = ({ 
  reducedMotion, 
  highContrast, 
  onToggleReducedMotion, 
  onToggleHighContrast 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={onToggleReducedMotion}
        className="bg-black/50 backdrop-blur-sm border border-white/20 text-white px-3 py-2 rounded-md text-xs hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label={reducedMotion ? "Enable animations" : "Disable animations"}
      >
        {reducedMotion ? "Enable Motion" : "Reduce Motion"}
      </button>
      <button
        onClick={onToggleHighContrast}
        className="bg-black/50 backdrop-blur-sm border border-white/20 text-white px-3 py-2 rounded-md text-xs hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
      >
        {highContrast ? "Normal Contrast" : "High Contrast"}
      </button>
    </div>
  );
};