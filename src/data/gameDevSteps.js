// src/data/gameDevSteps.js
import { Brain, FileText, Brush, Code, Music, Target, Rocket } from 'lucide-react';

export const gameDevSteps = [
  {
    icon: Brain,
    title: "Conceptualization",
    description: "Define your game's core concept, genre, and target audience",
    details: "Start with a simple idea and build from there. Ask yourself: What's the core gameplay loop? Who is your target audience? What makes your game unique?"
  },
  {
    icon: FileText,
    title: "Game Design Document",
    description: "Create a comprehensive blueprint for your game",
    details: "Document gameplay mechanics, story, characters, levels, and technical requirements. This serves as your roadmap throughout development."
  },
  {
    icon: Brush,
    title: "Art & Asset Creation",
    description: "Design characters, environments, and UI elements",
    details: "Create concept art, 3D models, textures, animations, and user interface elements. Start with simple placeholder art and iterate."
  },
  {
    icon: Code,
    title: "Programming & Logic",
    description: "Implement game mechanics and core systems",
    details: "Write scripts for player movement, game physics, AI behavior, scoring systems, and game state management using your chosen engine."
  },
  {
    icon: Music,
    title: "Audio Integration",
    description: "Add music, sound effects, and voice acting",
    details: "Compose or source background music, create sound effects for actions, and implement audio triggers that respond to gameplay events."
  },
  {
    icon: Target,
    title: "Testing & Polishing",
    description: "Playtest, debug, and refine your game",
    details: "Test with different players, fix bugs, balance difficulty, optimize performance, and polish the user experience."
  },
  {
    icon: Rocket,
    title: "Publishing & Marketing",
    description: "Launch your game and reach your audience",
    details: "Choose distribution platforms, create marketing materials, build a community, and plan your launch strategy."
  }
];