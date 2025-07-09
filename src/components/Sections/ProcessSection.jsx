// src/components/Sections/ProcessSection.jsx
import React, { useState, forwardRef } from 'react';
import { gameDevSteps } from '../../data/gameDevSteps.js';

const ProcessSection = forwardRef((props, ref) => {
  const [activeStep, setActiveStep] = useState(0);

  // Add safety check for gameDevSteps data
  const safeGameDevSteps = Array.isArray(gameDevSteps) ? gameDevSteps : [];

  // If no gameDevSteps data is available, use fallback data
  const fallbackSteps = [
    {
      title: "Concept & Planning",
      description: "Define your game idea, target audience, and core mechanics.",
      details: "Start with a clear vision of what you want to create. Research your target market, define the core gameplay loop, and create a game design document that outlines all major systems and features."
    },
    {
      title: "Prototyping",
      description: "Build a simple playable version to test core mechanics.",
      details: "Create a basic prototype focusing on the most important gameplay elements. This helps validate your concept early and identify potential issues before investing too much time in development."
    },
    {
      title: "Pre-Production",
      description: "Plan the technical architecture and create detailed designs.",
      details: "Establish coding standards, choose your technology stack, create detailed art style guides, and plan your development pipeline. This phase sets the foundation for efficient production."
    },
    {
      title: "Production",
      description: "Build the full game with all features and content.",
      details: "Implement all planned features, create art assets, design levels, compose music, and integrate everything into a cohesive experience. Regular testing and iteration are crucial during this phase."
    },
    {
      title: "Testing & Polish",
      description: "Debug, optimize, and refine the player experience.",
      details: "Conduct thorough testing to find and fix bugs, optimize performance across target platforms, balance gameplay elements, and polish the user interface and overall user experience."
    },
    {
      title: "Launch & Marketing",
      description: "Release your game and promote it to your audience.",
      details: "Prepare marketing materials, set up distribution channels, create a launch strategy, and engage with your community. Post-launch support and updates are also important for long-term success."
    }
  ];

  const steps = safeGameDevSteps.length > 0 ? safeGameDevSteps : fallbackSteps;

  if (safeGameDevSteps.length === 0) {
    console.warn('No gameDevSteps data found. Using fallback data. Please check your gameDevSteps.js file.');
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveStep(index);
    }
  };

  return (
    <section ref={ref} className="py-20 px-4" aria-labelledby="process-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="process-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          How to Build a Game
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'scale-105' : 'hover:scale-105'
                }`}
                onClick={() => setActiveStep(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
                role="button"
                aria-expanded={activeStep === index}
                aria-describedby={`step-details-${index}`}
              >
                <div className={`bg-black/30 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                  activeStep === index ? 'border-purple-500' : 'border-white/10'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
                      activeStep === index 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gray-700'
                    }`}>
                      {IconComponent ? (
                        <IconComponent className="w-8 h-8 text-white" />
                      ) : (
                        <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <span className="text-purple-400">0{index + 1}.</span>
                        {step.title || `Step ${index + 1}`}
                      </h3>
                      <p className="text-gray-300 mb-3">
                        {step.description || 'No description available'}
                      </p>
                      {activeStep === index && step.details && (
                        <div 
                          id={`step-details-${index}`}
                          className="mt-4 p-4 bg-white/5 rounded-lg border-l-4 border-purple-500"
                        >
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {step.details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ProcessSection.displayName = 'ProcessSection';
export default ProcessSection;