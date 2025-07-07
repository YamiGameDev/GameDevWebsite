// src/components/Sections/ProcessSection.jsx
import React, { forwardRef } from 'react';
import { gameDevSteps } from '@data/gameDevSteps';

const ProcessSection = forwardRef(({ 
  loadedSections, 
  activeStep, 
  setActiveStep, 
  reducedMotion 
}, ref) => {
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section ref={ref} className="relative z-10 py-20 px-4" aria-labelledby="process-title">
      {loadedSections.has(1) && (
        <div className="max-w-6xl mx-auto">
          <h2 id="process-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How to Build a Game
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6" role="tablist" aria-label="Game development steps">
              {gameDevSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      activeStep === index && !reducedMotion ? 'scale-105' : 'hover:scale-105'
                    }`}
                    onClick={() => setActiveStep(index)}
                    onKeyDown={(e) => handleKeyDown(e, () => setActiveStep(index))}
                    role="tab"
                    tabIndex={0}
                    aria-selected={activeStep === index}
                    aria-controls={`step-content-${index}`}
                  >
                    <div className={`bg-black/30 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 focus-within:ring-4 focus-within:ring-purple-500/50 ${
                      activeStep === index ? 'border-purple-500' : 'border-white/10 hover:border-white/20'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
                          activeStep === index 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gray-700 group-hover:bg-gray-600'
                        }`} aria-hidden="true">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <span className="text-purple-400" aria-hidden="true">0{index + 1}.</span>
                            {step.title}
                          </h3>
                          <p className="text-gray-300 mb-3">{step.description}</p>
                          <div 
                            id={`step-content-${index}`}
                            className={`overflow-hidden transition-all duration-500 ${
                              activeStep === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            role="tabpanel"
                          >
                            <p className="text-sm text-gray-400 leading-relaxed">{step.details}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="relative">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Development Timeline</h3>
                <div className="space-y-4" role="progressbar" aria-valuenow={activeStep + 1} aria-valuemin="1" aria-valuemax="7" aria-label="Development progress">
                  {gameDevSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index <= activeStep ? 'bg-purple-500' : 'bg-gray-600'
                      }`} aria-hidden="true"></div>
                      <div className={`flex-1 transition-all duration-300 ${
                        index === activeStep ? 'text-white' : 'text-gray-400'
                      }`}>
                        <div className="text-sm font-medium">{step.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

ProcessSection.displayName = 'ProcessSection';
export default ProcessSection;