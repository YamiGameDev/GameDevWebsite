// src/data/pathways.js
import { Code, Gamepad2, Users, Zap } from 'lucide-react';

export const pathways = [
  {
    icon: Code,
    title: "Programming",
    description: "Learn C#, JavaScript, Python, and game engines like Unity and Godot",
    color: "from-blue-500 to-purple-600",
    skills: ["C# for Unity", "JavaScript for Web Games", "Python for AI", "GDScript for Godot", "Lua for Scripting"]
  },
  {
    icon: Gamepad2,
    title: "Game Design",
    description: "Master level design, game mechanics, and player experience",
    color: "from-green-500 to-teal-600",
    skills: ["Level Design", "Game Mechanics", "Player Psychology", "Balancing", "UX Design"]
  },
  {
    icon: Users,
    title: "Art & Animation",
    description: "Create stunning visuals, 3D models, and character animations",
    color: "from-pink-500 to-red-600",
    skills: ["2D/3D Art", "Character Design", "Animation", "Texturing", "Visual Effects"]
  },
  {
    icon: Zap,
    title: "Audio Design",
    description: "Compose music, create sound effects, and design audio experiences",
    color: "from-yellow-500 to-orange-600",
    skills: ["Music Composition", "Sound Effects", "Audio Implementation", "Voice Acting", "Audio Processing"]
  }
];