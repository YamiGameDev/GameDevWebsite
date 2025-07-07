import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = forwardRef(({ isVisible, reducedMotion }, ref) => {
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
            <button className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold ${!reducedMotion ? 'hover:scale-105' : ''} transition-transform duration-300 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/50`}>
              Start Learning Today
            </button>
            <button className="px-8 py-4 border-2 border-white/20 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50">
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