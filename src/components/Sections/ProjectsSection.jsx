// src/components/Sections/ProjectsSection.jsx
import React, { forwardRef } from 'react';
import { FolderOpen } from 'lucide-react';
import { projectTypes } from '../../data/projectTypes.js';

const ProjectsSection = forwardRef(({ loadedSections, onProjectShowcaseOpen }, ref) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-300';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'Advanced':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <section ref={ref} className="relative z-10 py-20 px-4 bg-black/20" aria-labelledby="projects-title">
      {loadedSections.has(4) && (
        <div className="max-w-6xl mx-auto">
          <h2 id="projects-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Start With These Projects
          </h2>
          
          {/* Project Showcase CTA */}
          <div className="text-center mb-16">
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore our complete project gallery featuring real student work, detailed breakdowns, and step-by-step guides.
            </p>
            <button
              onClick={() => onProjectShowcaseOpen && onProjectShowcaseOpen()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <FolderOpen className="w-5 h-5" />
              View All Projects
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => (
              <article 
                key={index} 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 focus-within:ring-4 focus-within:ring-purple-500/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(project.difficulty)}`}
                    aria-label={`Difficulty level: ${project.difficulty}`}
                  >
                    {project.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-medium">Time:</span>
                    <span className="text-gray-300">{project.timeframe}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2" role="list">
                      {project.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300" 
                          role="listitem"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Action Button */}
                <button
                  onClick={() => onProjectShowcaseOpen && onProjectShowcaseOpen()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FolderOpen className="w-4 h-4" />
                  See Examples
                </button>
              </article>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to See More Amazing Projects?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Browse our complete showcase featuring games built by students like you. Get inspired and see what's possible with dedication and the right guidance.
            </p>
            <button
              onClick={() => onProjectShowcaseOpen && onProjectShowcaseOpen()}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              Explore Full Project Gallery
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
export default ProjectsSection;