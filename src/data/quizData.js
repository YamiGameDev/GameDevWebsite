// src/data/quizData.js
export const skillQuizzes = {
  programming: {
    title: 'Programming Fundamentals',
    description: 'Test your programming knowledge and problem-solving skills',
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of a game loop?',
        options: [
          'To handle user input only',
          'To continuously update and render the game',
          'To save game data',
          'To load game assets'
        ],
        correct: 1,
        explanation: 'A game loop continuously updates game logic and renders frames to create smooth gameplay.'
      },
      {
        id: 2,
        question: 'Which data structure is best for managing a game inventory?',
        options: [
          'Array',
          'LinkedList',
          'HashMap/Dictionary',
          'Stack'
        ],
        correct: 2,
        explanation: 'HashMap/Dictionary allows fast lookup of items by ID and easy quantity management.'
      },
      {
        id: 3,
        question: 'What is polymorphism in object-oriented programming?',
        options: [
          'Having multiple constructors',
          'Using the same interface for different underlying forms',
          'Creating multiple classes',
          'Inheriting from multiple parents'
        ],
        correct: 1,
        explanation: 'Polymorphism allows objects of different types to be treated as the same type through a common interface.'
      },
      {
        id: 4,
        question: 'When should you use object pooling in games?',
        options: [
          'For one-time objects',
          'For frequently created/destroyed objects',
          'For static objects only',
          'Never, it\'s outdated'
        ],
        correct: 1,
        explanation: 'Object pooling prevents garbage collection spikes by reusing objects that are frequently created and destroyed.'
      },
      {
        id: 5,
        question: 'What is the difference between Update() and FixedUpdate() in Unity?',
        options: [
          'No difference',
          'Update() is for graphics, FixedUpdate() for physics',
          'Update() is faster than FixedUpdate()',
          'FixedUpdate() only works in 2D games'
        ],
        correct: 1,
        explanation: 'Update() runs once per frame (variable timing), while FixedUpdate() runs at fixed intervals (ideal for physics).'
      }
    ]
  },
  design: {
    title: 'Game Design Principles',
    description: 'Evaluate your understanding of game design concepts and player psychology',
    questions: [
      {
        id: 1,
        question: 'What is the most important element of game flow?',
        options: [
          'Difficulty progression',
          'Visual effects',
          'Sound design',
          'Story complexity'
        ],
        correct: 0,
        explanation: 'Proper difficulty progression keeps players engaged without frustration or boredom.'
      },
      {
        id: 2,
        question: 'What does "juice" mean in game design?',
        options: [
          'Energy drinks for developers',
          'Game\'s monetization system',
          'Visual and audio feedback that makes actions feel satisfying',
          'The main character\'s health system'
        ],
        correct: 2,
        explanation: 'Juice refers to the satisfying feedback (visual, audio, haptic) that makes player actions feel impactful.'
      },
      {
        id: 3,
        question: 'Which principle helps prevent player frustration?',
        options: [
          'Punishment for failure',
          'Clear feedback and communication',
          'Hidden mechanics',
          'Random difficulty spikes'
        ],
        correct: 1,
        explanation: 'Clear feedback helps players understand what happened and how to improve, reducing frustration.'
      },
      {
        id: 4,
        question: 'What is the purpose of a core game loop?',
        options: [
          'To make the game last longer',
          'To create repetitive gameplay',
          'To establish the fundamental player actions and rewards',
          'To handle technical performance'
        ],
        correct: 2,
        explanation: 'The core game loop defines the basic cycle of actions and rewards that keep players engaged.'
      },
      {
        id: 5,
        question: 'How should tutorials be designed?',
        options: [
          'Show everything at once',
          'Make them completely optional',
          'Integrate teaching into gameplay progressively',
          'Use only text explanations'
        ],
        correct: 2,
        explanation: 'Progressive integration allows players to learn by doing while gradually introducing complexity.'
      }
    ]
  },
  engines: {
    title: 'Game Engine Knowledge',
    description: 'Test your familiarity with popular game engines and their features',
    questions: [
      {
        id: 1,
        question: 'Which engine is best for 2D indie games with pixel art?',
        options: [
          'Unreal Engine',
          'Unity',
          'Godot',
          'All are equally good'
        ],
        correct: 2,
        explanation: 'Godot excels at 2D development with built-in pixel-perfect rendering and lightweight architecture.'
      },
      {
        id: 2,
        question: 'What is Unreal Engine\'s visual scripting system called?',
        options: [
          'Visual Script',
          'Node Editor',
          'Blueprint',
          'FlowGraph'
        ],
        correct: 2,
        explanation: 'Blueprint is Unreal Engine\'s powerful visual scripting system for creating game logic without code.'
      },
      {
        id: 3,
        question: 'Which programming language is primarily used in Unity?',
        options: [
          'C++',
          'JavaScript',
          'C#',
          'Python'
        ],
        correct: 2,
        explanation: 'C# is Unity\'s primary scripting language, offering good performance and .NET framework integration.'
      },
      {
        id: 4,
        question: 'What makes Godot unique compared to Unity and Unreal?',
        options: [
          'Better graphics',
          'Open source and free',
          'Only works on mobile',
          'Requires no programming'
        ],
        correct: 1,
        explanation: 'Godot is completely open source and free, with no royalties or licensing fees.'
      },
      {
        id: 5,
        question: 'Which engine has the most advanced built-in lighting system?',
        options: [
          'Unity',
          'Unreal Engine',
          'Godot',
          'GameMaker'
        ],
        correct: 1,
        explanation: 'Unreal Engine 5\'s Lumen provides advanced real-time global illumination and reflections.'
      }
    ]
  }
};

export const skillLevels = {
  beginner: { min: 0, max: 40, title: 'Beginner', color: 'text-red-400' },
  intermediate: { min: 41, max: 70, title: 'Intermediate', color: 'text-yellow-400' },
  advanced: { min: 71, max: 85, title: 'Advanced', color: 'text-blue-400' },
  expert: { min: 86, max: 100, title: 'Expert', color: 'text-green-400' }
};

export function calculateSkillLevel(score) {
  for (const [level, range] of Object.entries(skillLevels)) {
    if (score >= range.min && score <= range.max) {
      return { level, ...range };
    }
  }
  return { level: 'beginner', ...skillLevels.beginner };
}