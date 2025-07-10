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
import GamingParticles from './components/UI/GamingParticles.jsx'; // Fixed typo: was GamingParticples
import EnrollmentModal from './components/UI/EnrollmentModal.jsx';
import SkillQuiz from './components/UI/SkillQuiz.jsx';
import ProjectShowcase from './components/UI/ProjectShowcase.jsx';
import ResourceDownload from './components/UI/ResourceDownload.jsx';
import ContactModal from './components/UI/ContactModal.jsx';
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

  // ✅ MODAL STATES - This was missing!
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [skillQuizOpen, setSkillQuizOpen] = useState(false);
  const [projectShowcaseOpen, setProjectShowcaseOpen] = useState(false);
  const [resourceDownloadOpen, setResourceDownloadOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // ✅ MODAL CONFIGURATION - This was missing!
  const [selectedQuizType, setSelectedQuizType] = useState('programming');
  const [preSelectedCourse, setPreSelectedCourse] = useState(null);
  const [contactInquiryType, setContactInquiryType] = useState('general');

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

  // ✅ MODAL HANDLER FUNCTIONS - This was missing!
  const handleEnrollmentOpen = (courseId = null) => {
    console.log('🎯 App.jsx: handleEnrollmentOpen called with courseId:', courseId);
    setPreSelectedCourse(courseId);
    setEnrollmentModalOpen(true);
  };

  const handleQuizOpen = (quizType) => {
    console.log('🎯 App.jsx: handleQuizOpen called with quizType:', quizType);
    setSelectedQuizType(quizType);
    setSkillQuizOpen(true);
  };

  const handleContactOpen = (inquiryType = 'general') => {
    console.log('🎯 App.jsx: handleContactOpen called with inquiryType:', inquiryType);
    setContactInquiryType(inquiryType);
    setContactModalOpen(true);
  };

  const handleResourceOpen = () => {
    console.log('🎯 App.jsx: handleResourceOpen called');
    setResourceDownloadOpen(true);
  };

  const handleProjectShowcaseOpen = () => {
    console.log('🎯 App.jsx: handleProjectShowcaseOpen called');
    setProjectShowcaseOpen(true);
  };

  // Debug: Log when App renders
  console.log('🔄 App.jsx rendered - Modal handlers available:', {
    handleEnrollmentOpen: !!handleEnrollmentOpen,
    handleQuizOpen: !!handleQuizOpen,
    handleContactOpen: !!handleContactOpen,
    handleResourceOpen: !!handleResourceOpen,
    handleProjectShowcaseOpen: !!handleProjectShowcaseOpen
  });

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

      {/* Gaming Particles - Only show if animations are enabled */}
      {!reducedMotion && <GamingParticles />}

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
        onContactOpen={handleContactOpen}
        onResourceOpen={handleResourceOpen}
        onProjectShowcaseOpen={handleProjectShowcaseOpen}
      />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section - ✅ NOW WITH MODAL HANDLERS! */}
        <HeroSection
          ref={heroRef}
          isVisible={heroVisible}
          reducedMotion={reducedMotion}
          onEnrollmentOpen={handleEnrollmentOpen}
          onProjectShowcaseOpen={handleProjectShowcaseOpen}
        />

        {/* Features Section */}
        <FeaturesSection
          ref={featuresRef}
          reducedMotion={reducedMotion}
          onEnrollmentOpen={handleEnrollmentOpen}
          onResourceOpen={handleResourceOpen}
        />

        {/* Skills Section */}
        <SkillsSection 
          ref={skillsRef}
          onQuizOpen={handleQuizOpen}
        />

        {/* Game Engines Section */}
        <EnginesSection
          ref={enginesRef}
          loadedSections={loadedSections}
        />

        {/* Projects Section */}
        <ProjectsSection
          ref={projectsRef}
          loadedSections={loadedSections}
          onProjectShowcaseOpen={handleProjectShowcaseOpen}
        />

        {/* Enhanced Resources Section */}
        <EnhancedResourcesSection
          ref={resourcesRef}
          loadedSections={loadedSections}
          onResourceOpen={handleResourceOpen}
        />

        {/* Process Section */}
        <ProcessSection ref={processRef} />

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <CTASection 
          onEnrollmentOpen={handleEnrollmentOpen}
          onContactOpen={handleContactOpen}
          onResourceOpen={handleResourceOpen}
        />
      </main>

      {/* Footer */}
      <Footer 
        onContactOpen={handleContactOpen}
        onResourceOpen={handleResourceOpen}
      />

      {/* Scroll to Top Button */}
      <ScrollToTop
        show={showScrollTop}
        reducedMotion={reducedMotion}
      />

      {/* ✅ MODALS - This was completely missing! */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        preSelectedCourse={preSelectedCourse}
      />

      <SkillQuiz
        isOpen={skillQuizOpen}
        onClose={() => setSkillQuizOpen(false)}
        quizType={selectedQuizType}
      />

      <ProjectShowcase
        isOpen={projectShowcaseOpen}
        onClose={() => setProjectShowcaseOpen(false)}
      />

      <ResourceDownload
        isOpen={resourceDownloadOpen}
        onClose={() => setResourceDownloadOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialInquiryType={contactInquiryType}
      />
    </div>
  );
}

export default App;