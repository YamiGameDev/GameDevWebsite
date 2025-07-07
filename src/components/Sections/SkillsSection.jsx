// src/components/Sections/SkillsSection.jsx
import React, { forwardRef } from 'react';
import { pathways } from '@data/pathways';

const SkillsSection = forwardRef(({ 
  loadedSections, 
  activeSection, 
  reducedMotion, 
  highContrast 
}, ref) => {
  const getGradientStyle = (pathway) => {
    if (highContrast) return {};
    
    const gradients = {
      'from-blue-500 to-purple-600': '#3b82f6, #8b5cf6',
      'from-green-500 to-teal-600': '#10b981, #0d9488',
      'from-pink-500 to-red-600': '#ec4899, #ef4444',
      'from-yellow-500 to-orange-600': '#eab308, #f97316'
    };
    
    return { background: `linear-gradient(135deg, ${gradients[pathway.color]})` };
  };

  return (
    <section ref={ref} className="relative z-10 py-20 px-4 bg-black/20" aria-labelledby="skills-title">
      {loadedSections.has(2) && (
        <div className="max-w-6xl mx-auto">
          <h2 id="skills-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Master These Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pathways.map((pathway, index) => {
              const IconComponent = pathway.icon;
              return (
                <article
                  key={index}
                  className={`relative group cursor-pointer transform transition-all duration-500 ${!reducedMotion && activeSection === index ? 'scale-105' : 'hover:scale-105'}`}
                >
                  {!highContrast && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-2xl blur group-hover:blur-none transition-all duration-300"
                      style={getGradientStyle(pathway)}
                      aria-hidden="true"
                    />
                  )}
                  
                  <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full focus-within:ring-4 focus-within:ring-purple-500/50">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${pathway.color} mb-4`} aria-hidden="true">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{pathway.title}</h3>
                    <p className="text-gray-300 mb-4">{pathway.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-200">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2" role="list">
                        {pathway.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300" role="listitem">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';
export default SkillsSection;