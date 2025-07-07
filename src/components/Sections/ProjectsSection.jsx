// src/components/Sections/ProjectsSection.jsx
import React, { forwardRef } from 'react';
import { projectTypes } from '@data/projectTypes';

const ProjectsSection = forwardRef(({ loadedSections }, ref) => {
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
          <h2 id="projects-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Start With These Projects
          </h2>
          
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
                
                <div className="space-y-3">
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
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
export default ProjectsSection;