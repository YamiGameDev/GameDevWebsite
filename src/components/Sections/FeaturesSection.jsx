// src/components/Sections/FeaturesSection.jsx
import React from 'react';
import { features } from '@data/features';

const FeaturesSection = ({ reducedMotion }) => {
  return (
    <section className="relative z-10 py-20 px-4 bg-black/20" aria-labelledby="features-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="features-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Why Learn With Us?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default FeaturesSection;