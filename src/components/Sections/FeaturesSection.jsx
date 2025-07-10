// src/components/Sections/FeaturesSection.jsx
import React, { forwardRef } from 'react';
import { features } from '../../data/features.js';

const FeaturesSection = forwardRef(({ reducedMotion, onEnrollmentOpen, onResourceOpen }, ref) => {
  return (
    <section ref={ref} className="relative z-10 py-20 px-4 bg-black/20" aria-labelledby="features-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="features-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Why Learn With Us?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <article key={index} className="text-center group">
                <div 
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6 ${!reducedMotion ? 'group-hover:scale-110' : ''} transition-transform duration-300`} 
                  aria-hidden="true"
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </article>
            );
          })}
        </div>

        {/* Course Enrollment Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-purple-400">
            Popular Courses
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unity Course */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">U</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Unity Fundamentals</h4>
                  <span className="text-sm text-purple-400">Beginner • 8 weeks</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Master Unity engine basics and create your first 2D/3D games with C# scripting.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-semibold">$299</span>
                <button
                  onClick={() => onEnrollmentOpen && onEnrollmentOpen('unity-beginner')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Unreal Course */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">UE</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Unreal Engine Mastery</h4>
                  <span className="text-sm text-purple-400">Intermediate • 12 weeks</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Advanced game development with Unreal Engine 5 and Blueprint scripting.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-semibold">$499</span>
                <button
                  onClick={() => onEnrollmentOpen && onEnrollmentOpen('unreal-intermediate')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Web Games Course */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JS</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Web Game Development</h4>
                  <span className="text-sm text-purple-400">Beginner • 6 weeks</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Create interactive web games using HTML5, JavaScript, and modern frameworks.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-semibold">$199</span>
                <button
                  onClick={() => onEnrollmentOpen && onEnrollmentOpen('web-games')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Game Development Journey?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their passion for games into professional skills. 
            Access premium resources, expert instruction, and a supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onEnrollmentOpen && onEnrollmentOpen()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Learning Today
            </button>
            <button
              onClick={() => onResourceOpen && onResourceOpen()}
              className="border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Browse Free Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';
export default FeaturesSection;