// src/components/Sections/SkillsSection.jsx
import React, { forwardRef } from 'react';
import { pathways } from '../../data/pathways.js';

const SkillsSection = forwardRef(({ onQuizOpen }, ref) => {
  // Add safety check for pathways data
  const safePathways = Array.isArray(pathways) ? pathways : [];

  // If no pathways data is available, show a fallback
  if (safePathways.length === 0) {
    console.warn('No pathways data found. Please check your pathways.js file.');
  }

  const handleQuizClick = (quizType) => {
    if (onQuizOpen) {
      onQuizOpen(quizType);
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 bg-black/20" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="skills-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Master These Skills
        </h2>
        
        {/* Quiz Assessment Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-purple-400">
            Test Your Current Skills
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">{'<>'}</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Programming</h4>
              <p className="text-gray-300 text-sm mb-4">Test your coding and logic skills</p>
              <button
                onClick={() => handleQuizClick('programming')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Take Quiz
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">🎨</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Game Design</h4>
              <p className="text-gray-300 text-sm mb-4">Evaluate your design knowledge</p>
              <button
                onClick={() => handleQuizClick('design')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Take Quiz
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">⚙️</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Game Engines</h4>
              <p className="text-gray-300 text-sm mb-4">Test your engine expertise</p>
              <button
                onClick={() => handleQuizClick('engines')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>
        
        {safePathways.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {safePathways.map((pathway, index) => {
              const IconComponent = pathway.icon;
              return (
                <article 
                  key={index} 
                  className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${pathway.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-400">
                      {pathway.title || 'Untitled Pathway'}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {pathway.description || 'No description available'}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-200">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(pathway.skills) && pathway.skills.length > 0 ? (
                        pathway.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No skills listed</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          // Fallback content when no data is available
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">Programming</h3>
              <p className="text-gray-300 mb-4">
                Master the fundamental programming concepts and languages used in game development.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-200">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {['C#', 'JavaScript', 'Python', 'C++', 'Object-Oriented Programming'].map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">Game Design</h3>
              <p className="text-gray-300 mb-4">
                Learn to create engaging gameplay mechanics, level design, and user experiences.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-200">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Game Mechanics', 'Level Design', 'User Experience', 'Balancing', 'Prototyping'].map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">Art & Animation</h3>
              <p className="text-gray-300 mb-4">
                Create stunning visuals, characters, and animations that bring games to life.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-200">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {['2D Art', '3D Modeling', 'Animation', 'Texturing', 'Concept Art'].map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">Audio Design</h3>
              <p className="text-gray-300 mb-4">
                Master sound design, music composition, and audio implementation in games.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-200">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Sound Design', 'Music Composition', 'Audio Implementation', 'Voice Acting', 'Audio Mixing'].map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';
export default SkillsSection;