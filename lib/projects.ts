/**
 * 项目数据处理函数 - 使用硬编码数据而非文件系统
 */
import type { Project, Category, Tag } from "./types"

// 预定义类别
export const categories: Category[] = [
  {
    name: "3D Design",
    slug: "3d-design",
    description: "3D modeling, rendering, and animation projects",
    icon: "cube",
  },
  {
    name: "2D Design",
    slug: "2d-design",
    description: "Graphic design, illustration, and UI/UX projects",
    icon: "layers",
  },
  {
    name: "Game Dev",
    slug: "game-dev",
    description: "Game development projects including design and programming",
    icon: "gamepad-2",
  },
  {
    name: "XR Dev",
    slug: "xr-dev",
    description: "Virtual and augmented reality development projects",
    icon: "headphones",
  },
  {
    name: "Creative Coding",
    slug: "creative-coding",
    description: "Generative art and creative coding experiments",
    icon: "code",
  },
]

// 硬编码的项目数据
const projectsData: Project[] = [
  {
    slug: "architectural-visualization",
    title: "Architectural Visualization",
    description: "3D visualization of modern architectural concepts",
    date: "2023-05-15",
    categories: ["3D Design"],
    tags: ["Blender", "V-Ray", "3D Modeling"],
    image: "/placeholder.svg?key=3d-arch",
    content: `
# Architectural Visualization Project

This project showcases modern architectural visualization techniques using Blender and V-Ray.

## Process

1. Initial concept sketching
2. 3D modeling of the structure
3. Material and texture application
4. Lighting setup
5. Rendering and post-processing

The final result demonstrates photorealistic rendering of contemporary architectural designs.
    `,
    featured: true,
  },
  {
    slug: "character-modeling",
    title: "Character Modeling",
    description: "Detailed 3D character designs for animation",
    date: "2023-06-20",
    categories: ["3D Design"],
    tags: ["ZBrush", "Maya", "Character Design"],
    image: "/placeholder.svg?key=3d-char",
    content: `
# Character Modeling Project

This project focuses on creating detailed 3D character models suitable for animation and games.

## Workflow

1. Concept art and reference gathering
2. Base mesh creation
3. High-poly sculpting in ZBrush
4. Retopology for animation
5. UV unwrapping and texturing
6. Rigging and test animations

The character was designed with a focus on both aesthetic appeal and technical efficiency for animation.
    `,
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    description: "Complete brand identity design for tech startup",
    date: "2023-04-10",
    categories: ["2D Design"],
    tags: ["Illustrator", "Photoshop", "Branding"],
    image: "/placeholder.svg?key=2d-brand",
    content: `
# Brand Identity Project

A comprehensive brand identity design for a technology startup, including logo, color palette, typography, and brand guidelines.

## Deliverables

- Logo design (primary and secondary versions)
- Color palette and usage guidelines
- Typography system
- Business cards and stationery
- Social media templates
- Brand style guide

The brand identity was designed to convey innovation, reliability, and forward-thinking values.
    `,
    featured: true,
  },
  {
    slug: "editorial-illustration",
    title: "Editorial Illustration",
    description: "Series of illustrations for digital magazine",
    date: "2023-03-15",
    categories: ["2D Design"],
    tags: ["Procreate", "Photoshop", "Illustration"],
    image: "/placeholder.svg?key=2d-illus",
    content: `
# Editorial Illustration Series

A collection of digital illustrations created for an online magazine's feature articles.

## Approach

- Concept development based on article themes
- Sketching and composition planning
- Digital painting in Procreate
- Final touches and formatting in Photoshop
- Adaptation for different display formats

The illustrations were designed to complement the written content while standing as artistic pieces in their own right.
    `,
  },
  {
    slug: "mobile-game",
    title: "Mobile Puzzle Game",
    description: "Casual puzzle game developed for iOS and Android",
    date: "2023-07-05",
    categories: ["Game Dev"],
    tags: ["Unity", "C#", "Mobile Development"],
    image: "/placeholder.svg?key=game-mobile",
    content: `
# Mobile Puzzle Game

A casual puzzle game developed for iOS and Android platforms using Unity.

## Features

- 50+ challenging levels
- Intuitive touch controls
- Progression system with unlockable content
- Integration with social sharing
- In-app purchases

The game was designed with a focus on accessibility and replayability, targeting casual mobile gamers.
    `,
  },
  {
    slug: "vr-training",
    title: "VR Training Simulation",
    description: "Industrial training application for VR headsets",
    date: "2023-08-12",
    categories: ["XR Dev"],
    tags: ["Unity", "C#", "VR Development", "Oculus"],
    image: "/placeholder.svg?key=xr-training",
    content: `
# VR Training Simulation

An immersive virtual reality training application designed for industrial safety procedures.

## Technical Details

- Developed for Oculus Quest 2
- Realistic physics interactions
- Voice-guided instructions
- Progress tracking and assessment
- Multi-user training sessions

The simulation provides a safe environment for workers to practice potentially dangerous procedures without real-world risks.
    `,
    featured: true,
  },
  {
    slug: "generative-art",
    title: "Generative Art System",
    description: "Algorithm-based art generation using p5.js",
    date: "2023-09-18",
    categories: ["Creative Coding"],
    tags: ["JavaScript", "p5.js", "Generative Art"],
    image: "/placeholder.svg?key=generative-art",
    content: `
# Generative Art System

A creative coding project that generates unique artwork based on algorithmic rules and randomization.

## Implementation

- Built with p5.js
- Parametric design system
- Real-time rendering
- Export functionality for high-resolution outputs
- Interactive controls for customization

Each generated artwork is unique, creating one-of-a-kind pieces that can be exported as prints or digital assets.
    `,
  },
]

// 获取所有标签
export function getAllTags(): Tag[] {
  const tagsSet = new Set<string>()

  projectsData.forEach((project) => {
    project.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet).map((tag) => ({
    name: tag,
    slug: tag.toLowerCase().replace(/\s+/g, "-"),
  }))
}

// 获取所有项目
export function getAllProjects(): Project[] {
  return [...projectsData].sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 获取项目详情
export function getProjectBySlug(slug: string): Project | null {
  return projectsData.find((project) => project.slug === slug) || null
}

// 按类别获取项目
export function getProjectsByCategory(categorySlug: string): Project[] {
  const category = categories.find((cat) => cat.slug === categorySlug)

  if (!category) return []

  return projectsData.filter((project) => project.categories.includes(category.name))
}

// 按标签获取项目
export function getProjectsByTag(tagSlug: string): Project[] {
  const tag = getAllTags().find((t) => t.slug === tagSlug)

  if (!tag) return []

  return projectsData.filter((project) => project.tags.includes(tag.name))
}
