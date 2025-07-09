// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';
import HeroSection from './components/Sections/HeroSection.jsx';
import FeaturesSection from './components/Sections/FeaturesSection.jsx';
import SkillsSection from './components/Sections/SkillsSection.jsx';
import EnginesSection from './components/Sections/EnginesSection.jsx';
import ProjectsSection from './components/Sections/ProjectsSection.jsx';
import EnhancedResourcesSection from './components/Sections/EnhancedResourcesSection.jsx';
import ProcessSection from './components/Sections/ProcessSection.jsx';
import StatsSection from './components/Sections/StatsSection.jsx';
import CTASection from './components/Sections/CTASection.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProgressBar from './components/UI/ProgressBar.jsx';
import ScrollToTop from './components/UI/ScrollToTop.jsx';
import BackgroundElements from './components/UI/BackgroundElements.jsx';
import AccessibilityControls from './components/UI/AccessibilityControls.jsx';
import useAccessibility from './hooks/useAccessibility.js';
import useScrollProgress from './hooks/useScrollProgress.js';
import useIntersectionObserver from './hooks/useIntersectionObserver.js';

function App() {
  // Accessibility state
  const { 
    reducedMotion, 
    highContrast, 
    toggleReducedMotion, 
    toggleHighContrast 
  } = useAccessibility();

  // Scroll progress
  const { scrollProgress, showScrollTop } = useScrollProgress();

  // Navigation and sections
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadedSections, setLoadedSections] = useState(new Set([0])); // Hero is loaded by default

  // Section refs
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const skillsRef = useRef(null);
  const enginesRef = useRef(null);
  const projectsRef = useRef(null);
  const resourcesRef = useRef(null);
  const processRef = useRef(null);

  // Section configuration
  const sections = [
    { name: 'Home', ref: heroRef },
    { name: 'Features', ref: featuresRef },
    { name: 'Skills', ref: skillsRef },
    { name: 'Engines', ref: enginesRef },
    { name: 'Projects', ref: projectsRef },
    { name: 'Resources', ref: resourcesRef }
  ];

  // Setup intersection observer for lazy loading
  useIntersectionObserver(sections, setLoadedSections);

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ 
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  // Hero visibility state
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Trigger hero animation after component mounts
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Apply high contrast class to body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden">
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.target.scrollIntoView()}
      >
        Skip to main content
      </a>

      {/* Background Elements */}
      <BackgroundElements show={!reducedMotion} />

      {/* Progress Bar */}
      <ProgressBar scrollProgress={scrollProgress} />

      {/* Accessibility Controls */}
      <AccessibilityControls
        reducedMotion={reducedMotion}
        highContrast={highContrast}
        onToggleReducedMotion={toggleReducedMotion}
        onToggleHighContrast={toggleHighContrast}
      />

      {/* Navigation */}
      <Navigation
        sections={sections}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        reducedMotion={reducedMotion}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          ref={heroRef}
          isVisible={heroVisible}
          reducedMotion={reducedMotion}
        />

        {/* Features Section */}
        <FeaturesSection
          ref={featuresRef}
          reducedMotion={reducedMotion}
        />

        {/* Skills Section */}
        <SkillsSection ref={skillsRef} />

        {/* Game Engines Section */}
        <EnginesSection
          ref={enginesRef}
          loadedSections={loadedSections}
        />

        {/* Projects Section */}
        <ProjectsSection
          ref={projectsRef}
          loadedSections={loadedSections}
        />

        {/* Enhanced Resources Section */}
        <EnhancedResourcesSection
          ref={resourcesRef}
          loadedSections={loadedSections}
        />

        {/* Process Section */}
        <ProcessSection ref={processRef} />

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop
        show={showScrollTop}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export default App;