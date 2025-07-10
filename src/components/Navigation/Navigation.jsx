// src/components/Navigation/Navigation.jsx
import React from 'react';
import { Menu, X, Home, Settings, BookOpen, Wrench, Code, FileText, MessageCircle, Download, FolderOpen } from 'lucide-react';

const Navigation = ({ 
  sections, 
  isMenuOpen, 
  setIsMenuOpen, 
  scrollToSection, 
  reducedMotion,
  onContactOpen,
  onResourceOpen,
  onProjectShowcaseOpen
}) => {
  const sectionIcons = [
    <Home className="w-4 h-4" />,
    <Settings className="w-4 h-4" />,
    <BookOpen className="w-4 h-4" />,
    <Wrench className="w-4 h-4" />,
    <Code className="w-4 h-4" />,
    <FileText className="w-4 h-4" />
  ];

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 z-30" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Game Dev Academy
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(section.ref)}
                onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(section.ref))}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
                aria-label={`Navigate to ${section.name} section`}
              >
                {sectionIcons[index]}
                <span className="text-sm">{section.name}</span>
              </button>
            ))}
            
            {/* Additional Navigation Items */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
              <button
                onClick={() => onProjectShowcaseOpen && onProjectShowcaseOpen()}
                onKeyDown={(e) => handleKeyDown(e, () => onProjectShowcaseOpen && onProjectShowcaseOpen())}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
                aria-label="View project showcase"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="text-sm">Projects</span>
              </button>
              
              <button
                onClick={() => onResourceOpen && onResourceOpen()}
                onKeyDown={(e) => handleKeyDown(e, () => onResourceOpen && onResourceOpen())}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
                aria-label="Browse resources"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Resources</span>
              </button>
              
              <button
                onClick={() => onContactOpen && onContactOpen('general')}
                onKeyDown={(e) => handleKeyDown(e, () => onContactOpen && onContactOpen('general'))}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent flex items-center gap-2"
                aria-label="Contact us"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Contact</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={(e) => handleKeyDown(e, () => setIsMenuOpen(!isMenuOpen))}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10" role="menu">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(section.ref)}
                onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(section.ref))}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
                role="menuitem"
                aria-label={`Navigate to ${section.name} section`}
              >
                {sectionIcons[index]}
                <span>{section.name}</span>
              </button>
            ))}
            
            {/* Mobile Additional Menu Items */}
            <div className="border-t border-white/10 mt-2 pt-2">
              <button
                onClick={() => {
                  onProjectShowcaseOpen && onProjectShowcaseOpen();
                  setIsMenuOpen(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, () => {
                  onProjectShowcaseOpen && onProjectShowcaseOpen();
                  setIsMenuOpen(false);
                })}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
                role="menuitem"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Project Showcase</span>
              </button>
              
              <button
                onClick={() => {
                  onResourceOpen && onResourceOpen();
                  setIsMenuOpen(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, () => {
                  onResourceOpen && onResourceOpen();
                  setIsMenuOpen(false);
                })}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
                role="menuitem"
              >
                <Download className="w-4 h-4" />
                <span>Resources</span>
              </button>
              
              <button
                onClick={() => {
                  onContactOpen && onContactOpen('general');
                  setIsMenuOpen(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, () => {
                  onContactOpen && onContactOpen('general');
                  setIsMenuOpen(false);
                })}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-md mt-2"
                role="menuitem"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;