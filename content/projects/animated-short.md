---
title: "Animated Short Film"
subtitle: "Animation"
description: "A short animated film featuring fluid character animations and visual effects for storytelling."
category: "animation"
tags: ["storytelling", "character-animation", "emotional", "sci-fi"]
thumbnail: "/3d-animation-project.png"
images: 
  - "/3d-project-1-3.png"
  - "/3d-project-2-3.png"
  - "/3d-project-3-3.png"
modelUrl: "/models/robot-character.glb"
featured: false
client: "Independent Project"
date: "February 2024"
software: ["Maya", "Arnold", "After Effects", "Premiere Pro"]
polygons: "120,000 (main character)"
formats: ["MP4", "MOV"]
relatedProjects:
  - slug: "cyberpunk-character"
    title: "Cyberpunk Character"
    category: "character"
  - slug: "product-visualization"
    title: "Product Visualization"
    category: "product"
---

## Project Overview

This animated short film tells the story of a robot discovering emotions. The 3-minute film combines character animation with visual effects to create an emotionally resonant narrative. The project showcases my abilities in character rigging, animation, lighting, and visual storytelling.

## Story Concept

"Spark" follows a service robot that accidentally receives an experimental emotion chip during a routine maintenance procedure. As the robot begins to experience feelings for the first time, it navigates a world that suddenly appears different through its newly emotional perspective.

The narrative explores themes of consciousness, identity, and what it means to be alive, all through the lens of a machine learning to feel.

## Production Process

The production followed a traditional animation pipeline, starting with storyboarding and animatics. Character and environment assets were created, followed by rigging and animation. The final stages included lighting, rendering, compositing, and sound design collaboration.

### Production Pipeline:

1. **Script & Storyboarding** - Developed the narrative and visual storytelling approach
2. **Character Design** - Created the robot character with a design that could express emotion despite limited facial features
3. **Environment Creation** - Built the futuristic world settings
4. **Rigging** - Developed a specialized rig for the robot character
5. **Animation** - Created character performances and movement
6. **Lighting & Rendering** - Established mood and atmosphere through lighting design
7. **Visual Effects** - Added particle systems and other effects
8. **Compositing** - Combined rendered elements and enhanced visual storytelling
9. **Sound Design** - Collaborated with audio designer for music and sound effects

## Challenges

Creating convincing emotional expressions for a robotic character was challenging. Additionally, the project required managing a complex production pipeline while working within tight deadlines.

The most significant technical challenge was developing a lighting system that could subtly shift throughout the film to reflect the robot's emotional journey, transitioning from sterile and cold to warm and vibrant as the story progressed.

## Solutions

I developed a specialized facial rig for the robot that could convey emotions through mechanical movements and lighting changes. To manage the production, I created a modular workflow that allowed for parallel development of different scenes.

For the lighting evolution, I implemented a color script that mapped emotional states to specific color palettes and lighting setups, then created a system of linked light rigs that could be adjusted globally while maintaining scene-specific details.

## Festival Submissions

The short film has been submitted to the following festivals:

- Annecy International Animation Film Festival
- SIGGRAPH Computer Animation Festival
- Animayo International Film Festival
- Stuttgart International Festival of Animated Film

## Behind the Scenes

The project involved over 45 different animation sequences and more than 4,200 frames of animation. The rendering process utilized a small render farm of 8 machines and took approximately 3 weeks to complete all frames at final quality.
\`\`\`

```package.json file="package.json"
{
  "name": "portfolio-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.294.0",
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
