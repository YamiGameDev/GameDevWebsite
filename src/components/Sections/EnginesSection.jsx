// src/components/Sections/EnginesSection.jsx
import React, { forwardRef } from 'react';
import { gameEngines } from '@data/gameEngines';

const EnginesSection = forwardRef(({ loadedSections }, ref) => {
  return (
    <section ref={ref} className="relative z-10 py-20 px-4" aria-labelledby="engines-title">
      {loadedSections.has(3) && (
        <div className="max-w-6xl mx-auto">
          <h2 id="engines-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Choose Your Game Engine
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {gameEngines.map((engine, index) => (
              <article 
                key={index} 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 focus-within:ring-4 focus-within:ring-purple-500/50"
              >
                <h3 className="text-2xl font-bold mb-4 text-purple-400">{engine.name}</h3>
                <p className="text-gray-300 mb-6">{engine.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Languages:</h4>
                    <div className="flex flex-wrap gap-2" role="list">
                      {engine.languages.map((lang, langIndex) => (
                        <span 
                          key={langIndex} 
                          className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300" 
                          role="listitem"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Platforms:</h4>
                    <div className="flex flex-wrap gap-2" role="list">
                      {engine.platforms.map((platform, platformIndex) => (
                        <span 
                          key={platformIndex} 
                          className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300" 
                          role="listitem"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Best For:</h4>
                    <p className="text-sm text-gray-400">{engine.bestFor}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});

EnginesSection.displayName = 'EnginesSection';
export default EnginesSection;