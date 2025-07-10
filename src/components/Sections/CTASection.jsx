// src/components/Sections/CTASection.jsx
import React from 'react';
import { Download, MessageCircle } from 'lucide-react';

const CTASection = ({ onEnrollmentOpen, onContactOpen, onResourceOpen }) => {
  return (
    <section className="relative z-10 py-20 px-4" aria-labelledby="cta-title">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="cta-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Ready to Build Your First Game?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our comprehensive game development program and learn everything you need to create amazing games from scratch.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => onEnrollmentOpen && onEnrollmentOpen()}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            aria-describedby="cta-description"
          >
            Start Free Course
          </button>
          <button 
            onClick={() => onResourceOpen && onResourceOpen()}
            className="px-10 py-4 border-2 border-white/20 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 flex items-center gap-2"
            aria-describedby="cta-description"
          >
            <Download className="w-5 h-5" />
            Download Learning Guide
          </button>
        </div>

        {/* Additional Support Options */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Our team is here to help you choose the right learning path and answer any questions about our courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onContactOpen && onContactOpen('enrollment')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Talk to an Advisor
            </button>
            <button
              onClick={() => onContactOpen && onContactOpen('general')}
              className="border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Ask Questions
            </button>
          </div>
        </div>
        
        <p id="cta-description" className="sr-only">
          Start your game development journey today with our comprehensive courses and learning materials.
        </p>
      </div>
    </section>
  );
};

export default CTASection;