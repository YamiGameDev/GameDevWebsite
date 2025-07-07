// src/App.jsx - Final Complete Version
import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@components/Navigation/Navigation';
import HeroSection from '@components/Sections/HeroSection';
import ProcessSection from '@components/Sections/ProcessSection';
import SkillsSection from '@components/Sections/SkillsSection';
import EnginesSection from '@components/Sections/EnginesSection';
import ProjectsSection from '@components/Sections/ProjectsSection';
import EnhancedResourcesSection from '@components/Sections/EnhancedResourcesSection';
import FeaturesSection from '@components/Sections/FeaturesSection';
import StatsSection from '@components/Sections/StatsSection';
import CTASection from '@components/Sections/CTASection';
import Footer from '@components/Footer/Footer';
import AccessibilityControls from '@components/UI/AccessibilityControls';
import ProgressBar from '@components/UI/ProgressBar';
import ScrollToTop from '@components/UI/ScrollToTop';
import BackgroundElements from '@components/UI/BackgroundElements';

import useScrollProgress from '@hooks/useScrollProgress';
import useAccessibility from '@hooks/useAccessibility';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadedSections, setLoadedSections] = useState(new Set([0]));

  const { scrollProgress, showScrollTop } = useScrollProgress();
  const { reducedMotion, highContrast, toggleReducedMotion, toggleHighContrast } = useAccessibility();

  // Section refs
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const skillsRef = useRef(null);
  const enginesRef = useRef(null);
  const projectsRef = useRef(null);
  const resourcesRef = useRef(null);

  const sections = [
    { name: 'Home', ref: heroRef },
    { name: 'How to Build', ref: processRef },
    { name: 'Skills', ref: skillsRef },
    { name: 'Engines', ref: enginesRef },
    { name: 'Projects', ref: projectsRef },
    { name: 'Resources', ref: resourcesRef }
  ];

  // Intersection observer for lazy loading
  useIntersectionObserver(sections, setLoadedSections);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycling animations (only if motion not reduced)
    let interval, stepInterval;
    if (!reducedMotion) {
      interval = setInterval(() => {
        setActiveSection(prev => (prev + 1) % 4);
      }, 3000);
      stepInterval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 7);
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [reducedMotion]);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'} overflow-hidden`}>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Accessibility Controls */}
      <AccessibilityControls 
        reducedMotion={reducedMotion}
        highContrast={highContrast}
        onToggleReducedMotion={toggleReducedMotion}
        onToggleHighContrast={toggleHighContrast}
      />

      {/* Progress Bar */}
      <ProgressBar scrollProgress={scrollProgress} />

      {/* Navigation */}
      <Navigation 
        sections={sections}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        reducedMotion={reducedMotion}
      />

      {/* Background Elements */}
      <BackgroundElements show={!reducedMotion && !highContrast} />

      {/* Main Content */}
      <main>
        <HeroSection 
          ref={heroRef}
          isVisible={isVisible}
          reducedMotion={reducedMotion}
        />
        
        <ProcessSection 
          ref={processRef}
          loadedSections={loadedSections}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          reducedMotion={reducedMotion}
        />
        
        <SkillsSection 
          ref={skillsRef}
          loadedSections={loadedSections}
          activeSection={activeSection}
          reducedMotion={reducedMotion}
          highContrast={highContrast}
        />
        
        <EnginesSection 
          ref={enginesRef}
          loadedSections={loadedSections}
        />
        
        <ProjectsSection 
          ref={projectsRef}
          loadedSections={loadedSections}
        />
        
        <EnhancedResourcesSection 
          ref={resourcesRef}
          loadedSections={loadedSections}
        />
        
        <FeaturesSection reducedMotion={reducedMotion} />
        
        <StatsSection />
        
        <CTASection />
      </main>

      <Footer />

      {/* Scroll to Top */}
      <ScrollToTop 
        show={showScrollTop}
        reducedMotion={reducedMotion}
      />
    </div>
  );
};

export default App;