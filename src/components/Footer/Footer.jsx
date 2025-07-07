// src/components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: "Game Dev Academy",
      content: "Comprehensive game development education covering programming, design, art, and audio for aspiring developers.",
      isDescription: true
    },
    {
      title: "Courses",
      links: [
        "Unity Development",
        "Unreal Engine",
        "Game Design Theory",
        "3D Art & Animation",
        "Mobile Game Dev",
        "Indie Game Design"
      ]
    },
    {
      title: "Resources",
      links: [
        "Learning Roadmaps",
        "Project Templates",
        "Video Tutorials",
        "Asset Libraries",
        "Documentation",
        "Code Examples"
      ]
    },
    {
      title: "Community",
      links: [
        "Discord Server",
        "Student Showcase",
        "Mentorship Program",
        "Game Jams",
        "Career Services",
        "Help Center"
      ]
    }
  ];

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleLinkClick = (linkText) => {
    // Placeholder for actual navigation logic
    console.log(`Navigate to: ${linkText}`);
  };

  return (
    <footer className="relative z-10 border-t border-white/10 py-12 px-4 bg-black/20" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4 text-white">{section.title}</h3>
              
              {section.isDescription ? (
                <p className="text-gray-400 leading-relaxed">{section.content}</p>
              ) : (
                <nav aria-label={`${section.title} navigation`}>
                  <ul className="space-y-2" role="list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} role="listitem">
                        <button
                          onClick={() => handleLinkClick(link)}
                          onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick(link))}
                          className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-sm text-left"
                          aria-label={`Navigate to ${link}`}
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          ))}
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                &copy; 2025 Game Dev Academy. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <button
                onClick={() => handleLinkClick('Privacy Policy')}
                onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick('Privacy Policy'))}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleLinkClick('Terms of Service')}
                onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick('Terms of Service'))}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                aria-label="View Terms of Service"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleLinkClick('Contact Us')}
                onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick('Contact Us'))}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                aria-label="Contact Us"
              >
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Accessibility Statement */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              This website is designed to be accessible and follows WCAG 2.1 AA guidelines.{' '}
              <button
                onClick={() => handleLinkClick('Accessibility Statement')}
                onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick('Accessibility Statement'))}
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-sm underline"
                aria-label="View full accessibility statement"
              >
                Learn more about our accessibility commitment
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;