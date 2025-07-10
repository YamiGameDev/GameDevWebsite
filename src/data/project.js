// src/data/projects.js
export const showcaseProjects = [
  {
    id: 'space-runner',
    title: 'Space Runner 3D',
    description: 'An endless runner game set in space with dynamic obstacles and power-ups',
    category: '3D Games',
    difficulty: 'Intermediate',
    engine: 'Unity',
    technologies: ['C#', 'Unity', 'Blender', 'ProBuilder'],
    features: [
      'Procedural level generation',
      'Particle effects system',
      'Achievement system',
      'Leaderboard integration',
      'Mobile-optimized controls'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    demoUrl: 'https://demo.example.com/space-runner',
    githubUrl: 'https://github.com/example/space-runner',
    duration: '6 weeks',
    teamSize: '1 developer',
    highlights: [
      'Custom shader for space background',
      'Optimized for 60fps on mobile',
      'Implemented save system'
    ]
  },
  {
    id: 'puzzle-master',
    title: 'Puzzle Master 2D',
    description: 'A mind-bending puzzle game with unique mechanics and beautiful pixel art',
    category: '2D Games',
    difficulty: 'Beginner',
    engine: 'Godot',
    technologies: ['GDScript', 'Godot', 'Aseprite', 'Audacity'],
    features: [
      'Level editor',
      'Undo/Redo system',
      'Hint system',
      'Multiple themes',
      'Progressive difficulty'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    demoUrl: 'https://demo.example.com/puzzle-master',
    githubUrl: 'https://github.com/example/puzzle-master',
    duration: '4 weeks',
    teamSize: '2 developers',
    highlights: [
      'Custom tile-based system',
      'Accessibility features',
      'Cross-platform deployment'
    ]
  },
  {
    id: 'battle-arena',
    title: 'Battle Arena Multiplayer',
    description: 'Real-time multiplayer combat game with various character classes',
    category: 'Multiplayer',
    difficulty: 'Advanced',
    engine: 'Unreal Engine',
    technologies: ['C++', 'Blueprint', 'Unreal Engine', 'Photon', 'Maya'],
    features: [
      'Real-time multiplayer',
      'Character customization',
      'Skill trees',
      'Spectator mode',
      'Anti-cheat system'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    demoUrl: 'https://demo.example.com/battle-arena',
    githubUrl: 'https://github.com/example/battle-arena',
    duration: '12 weeks',
    teamSize: '4 developers',
    highlights: [
      'Custom netcode optimization',
      'Advanced AI for bots',
      'Dynamic lighting system'
    ]
  },
  {
    id: 'web-racer',
    title: 'Web Racer',
    description: 'High-speed racing game that runs smoothly in any web browser',
    category: 'Web Games',
    difficulty: 'Intermediate',
    engine: 'Three.js',
    technologies: ['JavaScript', 'Three.js', 'WebGL', 'Blender', 'Web Audio API'],
    features: [
      'WebGL graphics',
      'Progressive loading',
      'Mobile responsive',
      'Gamepad support',
      'Social sharing'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    demoUrl: 'https://demo.example.com/web-racer',
    githubUrl: 'https://github.com/example/web-racer',
    duration: '8 weeks',
    teamSize: '3 developers',
    highlights: [
      'Custom physics engine',
      'Optimized for all devices',
      'PWA capabilities'
    ]
  },
  {
    id: 'ar-pet',
    title: 'AR Pet Companion',
    description: 'Augmented reality mobile game featuring virtual pet care and interaction',
    category: 'Mobile AR',
    difficulty: 'Advanced',
    engine: 'Unity AR Foundation',
    technologies: ['C#', 'Unity', 'AR Foundation', 'ARCore', 'ARKit'],
    features: [
      'AR object placement',
      'Pet AI behavior',
      'Mini-games',
      'Photo mode',
      'Cloud save'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    demoUrl: 'https://demo.example.com/ar-pet',
    githubUrl: 'https://github.com/example/ar-pet',
    duration: '10 weeks',
    teamSize: '2 developers',
    highlights: [
      'Cross-platform AR',
      'Machine learning for pet behavior',
      'Real-world integration'
    ]
  },
  {
    id: 'retro-platformer',
    title: 'Retro Platformer',
    description: 'Classic side-scrolling platformer with modern polish and tight controls',
    category: '2D Games',
    difficulty: 'Beginner',
    engine: 'GameMaker Studio',
    technologies: ['GML', 'GameMaker Studio', 'Aseprite', 'FL Studio'],
    features: [
      'Pixel-perfect movement',
      'Collectible secrets',
      'Boss battles',
      'Speedrun mode',
      'Multiple endings'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    demoUrl: 'https://demo.example.com/retro-platformer',
    githubUrl: 'https://github.com/example/retro-platformer',
    duration: '5 weeks',
    teamSize: '1 developer',
    highlights: [
      'Authentic retro feel',
      'Tight responsive controls',
      'Procedural music system'
    ]
  }
];

export const projectCategories = [
  'All Projects',
  '2D Games',
  '3D Games',
  'Web Games',
  'Mobile AR',
  'Multiplayer'
];

export const difficultyLevels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export const gameEngines = [
  'All Engines',
  'Unity',
  'Unreal Engine',
  'Godot',
  'Three.js',
  'GameMaker Studio'
];