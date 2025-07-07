// src/components/Sections/CTASection.jsx
import React from 'react';

const CTASection = () => {
  return (
    <section className="relative z-10 py-20 px-4" aria-labelledby="cta-title">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="cta-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Ready to Build Your First Game?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our comprehensive game development program and learn everything you need to create amazing games from scratch.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            aria-describedby="cta-description"
          >
            Start Free Course
          </button>
          <button 
            className="px-10 py-4 border-2 border-white/20 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-describedby="cta-description"
          >
            Download Learning Guide
          </button>
        </div>
        
        <p id="cta-description" className="sr-only">
          Start your game development journey today with our comprehensive courses and learning materials.
        </p>
      </div>
    </section>
  );
};

export default CTASection;