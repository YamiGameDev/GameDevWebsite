import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = forwardRef(({ isVisible, reducedMotion, onEnrollmentOpen, onProjectShowcaseOpen }, ref) => {
  return (
    <section 
      ref={ref} 
      id="main-content" 
      className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20" 
      aria-labelledby="hero-title"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Master Game<br />Development
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Learn to create games from concept to release. Master programming, design, art, and audio to build the interactive experiences of tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Start Learning Today Button */}
            <button
              onClick={() => onEnrollmentOpen && onEnrollmentOpen()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Learning Today
            </button>
            
            {/* View Course Roadmap Button */}
            <button
              onClick={() => onProjectShowcaseOpen && onProjectShowcaseOpen()}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              View Course Roadmap
            </button>
          </div>
        </div>
        
        {!reducedMotion && (
          <div className="mt-16 animate-bounce" aria-hidden="true">
            <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
          </div>
        )}
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;