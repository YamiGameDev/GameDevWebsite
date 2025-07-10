// src/data/courses.js
export const courses = [
  {
    id: 'unity-beginner',
    title: 'Unity Game Development Fundamentals',
    description: 'Master the basics of Unity engine and create your first 2D/3D games',
    duration: '8 weeks',
    level: 'Beginner',
    price: 299,
    features: [
      'Unity Interface & Tools',
      'C# Programming Basics',
      '2D & 3D Game Creation',
      'Physics & Animation',
      'UI Design & Implementation',
      'Game Publishing'
    ],
    prerequisites: 'Basic computer skills',
    projects: ['2D Platformer', '3D Racing Game', 'Mobile Puzzle Game']
  },
  {
    id: 'unreal-intermediate',
    title: 'Unreal Engine Mastery',
    description: 'Advanced game development with Unreal Engine 5 and Blueprint scripting',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 499,
    features: [
      'Unreal Engine 5 Features',
      'Blueprint Visual Scripting',
      'Advanced Lighting & Rendering',
      'Multiplayer Game Development',
      'AI & Behavior Trees',
      'Performance Optimization'
    ],
    prerequisites: 'Basic programming knowledge',
    projects: ['First-Person Shooter', 'Open World RPG', 'Multiplayer Arena']
  },
  {
    id: 'web-games',
    title: 'Web Game Development',
    description: 'Create interactive web games using HTML5, JavaScript, and modern frameworks',
    duration: '6 weeks',
    level: 'Beginner',
    price: 199,
    features: [
      'HTML5 Canvas & WebGL',
      'JavaScript Game Programming',
      'Phaser.js Framework',
      'WebAudio API',
      'Progressive Web Apps',
      'Game Monetization'
    ],
    prerequisites: 'Basic HTML/CSS knowledge',
    projects: ['Browser Arcade Game', 'Mobile Web Game', 'PWA Game']
  },
  {
    id: 'mobile-development',
    title: 'Mobile Game Development',
    description: 'Cross-platform mobile game development for iOS and Android',
    duration: '10 weeks',
    level: 'Intermediate',
    price: 399,
    features: [
      'React Native Game Development',
      'Native Performance Optimization',
      'Touch Controls & Gestures',
      'In-App Purchases',
      'App Store Publishing',
      'Analytics & Monetization'
    ],
    prerequisites: 'JavaScript knowledge',
    projects: ['Endless Runner', 'Match-3 Game', 'AR Mobile Game']
  }
];

export const enrollmentSteps = [
  {
    step: 1,
    title: 'Personal Information',
    fields: ['fullName', 'email', 'phone', 'experience']
  },
  {
    step: 2,
    title: 'Course Selection',
    fields: ['selectedCourse', 'startDate', 'learningGoals']
  },
  {
    step: 3,
    title: 'Payment & Confirmation',
    fields: ['paymentMethod', 'agreement']
  }
];