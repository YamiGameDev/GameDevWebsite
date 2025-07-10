import React, { useState, useEffect } from 'react';

const GamingParticles = () => {
  const [particles, setParticles] = useState([]);

  // Gaming-themed elements
  const gameElements = [
    // Code snippets
    'function()', 'if()', 'for(i)', 'class{}', 'const x', 'return', '++i', 'new()', 'async', 'await',
    // Game development terms
    'Unity', 'C#', 'JS', 'React', 'CSS', 'HTML', 'API', 'JSON', 'Git', 'npm',
    // Gaming symbols
    '⚡', '🎮', '🕹️', '⭐', '🎯', '🚀', '💎', '🔥', '✨', '🎪',
    // Geometric shapes (using Unicode)
    '▲', '●', '■', '◆', '▼', '◀', '▶', '◥', '◤', '◣'
  ];

  const codeSnippets = [
    'function jump()', 'player.move()', 'if(gameOver)', 'score += 10', 'render()',
    'update()', 'new Enemy()', 'collision()', 'animate()', 'loadLevel()'
  ];

  // Generate random particles
  const generateParticle = (id) => {
    const isCodeSnippet = Math.random() < 0.3;
    const element = isCodeSnippet 
      ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
      : gameElements[Math.floor(Math.random() * gameElements.length)];

    return {
      id,
      element,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.4,
      speed: Math.random() * 20 + 10,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      isCode: isCodeSnippet,
      color: isCodeSnippet ? '#64ffda' : '#bb86fc'
    };
  };

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 25 }, (_, i) => generateParticle(i));
    setParticles(initialParticles);

    // Animation loop
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y <= -10 ? 110 : particle.y - (particle.speed * 0.02),
          rotation: particle.rotation + particle.rotationSpeed,
          opacity: particle.y > 90 ? particle.opacity * 0.98 : particle.opacity
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transition-all duration-75 ease-linear"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.size})`,
            opacity: particle.opacity,
            color: particle.color,
            fontSize: particle.isCode ? '0.8rem' : '1.2rem',
            fontFamily: particle.isCode ? 'monospace' : 'inherit',
            fontWeight: particle.isCode ? '500' : 'normal',
            textShadow: particle.isCode ? '0 0 10px currentColor' : 'none',
            filter: particle.isCode ? 'drop-shadow(0 0 3px currentColor)' : 'none'
          }}
        >
          {particle.element}
        </div>
      ))}
      
      {/* Floating geometric shapes
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`geo-${i}`}
            className="absolute opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div 
              className="w-16 h-16 border-2 border-purple-400 rotate-45 animate-spin"
              style={{
                animationDuration: `${15 + Math.random() * 5}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
              }}
            />
          </div>
        ))}
      </div> */}

      {/* Floating code brackets */}
      <div className="absolute inset-0 opacity-20">
        {['{', '}', '[', ']', '<', '>', '(', ')'].map((bracket, i) => (
          <div
            key={`bracket-${i}`}
            className="absolute text-cyan-400 text-4xl font-mono animate-bounce"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          >
            {bracket}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s'
            }}
          >
            <div className="w-3 h-3 bg-pink-400 rounded-full opacity-30 blur-sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingParticles;