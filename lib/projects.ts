/**
 * Projects Data Module
 * Manages project data and provides utility functions
 */
import { getAllProjectsFromMdx, getProjectData, getAllCategoriesFromMdx, getAllTagsFromMdx } from "./mdx"

export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  process: string
  challenges: string
  solutions: string
  category: string
  tags: string[]
  thumbnail: string
  images: string[]
  modelUrl: string
  featured: boolean
  client: string
  date: string
  software: string[]
  polygons: string
  formats: string[]
  relatedProjects: {
    slug: string
    title: string
    category: string
  }[]
  contentHtml?: string
}

// Fallback mock projects data - used only if MDX files are not available
export const fallbackProjects: Project[] = [
  {
    id: "1",
    slug: "cyberpunk-character",
    title: "Cyberpunk Character",
    subtitle: "Character Design",
    description:
      "A high-detail cyberpunk character model created for a sci-fi game, featuring complete materials and rigging.",
    fullDescription:
      "This cyberpunk character was designed for a futuristic sci-fi game environment. The character features a highly detailed model with intricate cybernetic enhancements, realistic facial features, and a complete set of customizable clothing and accessories. The model was created with game-ready optimization in mind, balancing visual fidelity with performance requirements.",
    process:
      "The creation process began with concept sketches and mood boards to establish the visual direction. After finalizing the design, I created a base mesh in ZBrush, refined the high-poly details, and then retopologized for game use. UV mapping and texturing were done in Substance Painter, followed by rigging and animation setup in Maya.",
    challenges:
      "The main challenge was creating a character that maintained visual impact while meeting the polygon budget for real-time rendering. Additionally, the complex cybernetic parts required careful planning to ensure they would animate correctly with the character's movements.",
    solutions:
      "I used normal maps and other texture techniques to preserve detail while keeping the polygon count manageable. For the cybernetic parts, I created a modular system that allowed for efficient reuse of components while maintaining visual variety.",
    category: "character",
    tags: ["sci-fi", "game-ready", "cyberpunk", "human", "rigged"],
    thumbnail: "/3d-character-project.png",
    images: ["/3d-project-1-1.png", "/3d-project-1-2.png", "/3d-project-1-3.png"],
    modelUrl: "/models/cyberpunk-character.glb",
    featured: true,
    client: "Neon Games Studio",
    date: "June 2023",
    software: ["Blender", "ZBrush", "Substance Painter", "Maya"],
    polygons: "45,000",
    formats: ["FBX", "OBJ", "GLB"],
    relatedProjects: [
      {
        slug: "fantasy-environment",
        title: "Fantasy Environment",
        category: "environment",
      },
      {
        slug: "sci-fi-weapon",
        title: "Sci-Fi Weapon",
        category: "prop",
      },
    ],
  },
  {
    id: "2",
    slug: "fantasy-environment",
    title: "Fantasy Environment",
    subtitle: "Environment Design",
    description: "Fantasy-style environment design with rich vegetation, architecture, and atmospheric effects.",
    fullDescription:
      "This fantasy environment was created as a showcase piece for a medieval-themed RPG. The scene features a detailed ancient temple surrounded by lush vegetation, flowing water elements, and atmospheric lighting. Every element was carefully crafted to create an immersive and believable fantasy world that players would want to explore.",
    process:
      "The environment began with landscape blocking and composition studies. After establishing the main layout, I created the architectural elements, followed by vegetation and natural elements. The final stage involved lighting setup, particle effects, and post-processing to achieve the desired atmosphere.",
    challenges:
      "Creating a believable environment that balanced fantasy elements with realistic details was challenging. Additionally, optimizing the scene for real-time rendering while maintaining visual quality required careful asset management.",
    solutions:
      "I used a combination of procedural and hand-crafted textures to add variety while maintaining consistency. For optimization, I implemented LOD systems and instanced vegetation to reduce draw calls while preserving the dense forest feel.",
    category: "environment",
    tags: ["fantasy", "medieval", "nature", "architecture"],
    thumbnail: "/3d-environment-project.png",
    images: ["/3d-project-2-1.png", "/3d-project-2-2.png", "/3d-project-2-3.png"],
    modelUrl: "/models/fantasy-environment.glb",
    featured: true,
    client: "Mythic Realms Interactive",
    date: "September 2023",
    software: ["Blender", "World Creator", "Substance Designer", "Unreal Engine"],
    polygons: "1.2 million",
    formats: ["FBX", "USD", "UE5 Project"],
    relatedProjects: [
      {
        slug: "cyberpunk-character",
        title: "Cyberpunk Character",
        category: "character",
      },
      {
        slug: "medieval-props",
        title: "Medieval Props Collection",
        category: "prop",
      },
    ],
  },
  {
    id: "3",
    slug: "product-visualization",
    title: "Product Visualization",
    subtitle: "Product Design",
    description:
      "High-quality 3D product visualization rendering, providing realistic product displays for marketing campaigns.",
    fullDescription:
      "This product visualization project was created for a luxury watch brand's marketing campaign. The goal was to create photorealistic renders that showcase the product's premium materials and intricate details. The final images were used for both print and digital advertising, providing the client with versatile marketing assets.",
    process:
      "The process began with precise modeling based on technical specifications and reference photos. Materials were carefully recreated to match the physical properties of metal, glass, and leather components. Studio lighting setups were created to highlight the product's best features, followed by rendering and post-processing.",
    challenges:
      "Achieving photorealistic materials was particularly challenging, especially for the watch's metallic surfaces and the subtle reflections on the crystal. Client feedback required several iterations to perfect the lighting to highlight specific design elements.",
    solutions:
      "I used physically-based rendering techniques with custom material shaders to achieve realistic metal and glass properties. Multiple lighting scenarios were created to give the client options, and compositing techniques were used to enhance specific details in post-production.",
    category: "product",
    tags: ["commercial", "photorealistic", "luxury", "advertising"],
    thumbnail: "/3d-product-project.png",
    images: ["/3d-project-3-1.png", "/3d-project-3-2.png", "/3d-project-3-3.png"],
    modelUrl: "/models/luxury-watch.glb",
    featured: false,
    client: "Chrono Luxury Brands",
    date: "November 2023",
    software: ["Blender", "Corona Renderer", "Photoshop"],
    polygons: "850,000",
    formats: ["FBX", "OBJ", "Blender"],
    relatedProjects: [
      {
        slug: "architectural-visualization",
        title: "Architectural Visualization",
        category: "architecture",
      },
      {
        slug: "jewelry-collection",
        title: "Jewelry Collection",
        category: "product",
      },
    ],
  },
  {
    id: "4",
    slug: "animated-short",
    title: "Animated Short Film",
    subtitle: "Animation",
    description: "A short animated film featuring fluid character animations and visual effects for storytelling.",
    fullDescription:
      "This animated short film tells the story of a robot discovering emotions. The 3-minute film combines character animation with visual effects to create an emotionally resonant narrative. The project showcases my abilities in character rigging, animation, lighting, and visual storytelling.",
    process:
      "The production followed a traditional animation pipeline, starting with storyboarding and animatics. Character and environment assets were created, followed by rigging and animation. The final stages included lighting, rendering, compositing, and sound design collaboration.",
    challenges:
      "Creating convincing emotional expressions for a robotic character was challenging. Additionally, the project required managing a complex production pipeline while working within tight deadlines.",
    solutions:
      "I developed a specialized facial rig for the robot that could convey emotions through mechanical movements and lighting changes. To manage the production, I created a modular workflow that allowed for parallel development of different scenes.",
    category: "animation",
    tags: ["storytelling", "character-animation", "emotional", "sci-fi"],
    thumbnail: "/3d-animation-project.png",
    images: ["/3d-project-1-3.png", "/3d-project-2-3.png", "/3d-project-3-3.png"],
    modelUrl: "/models/robot-character.glb",
    featured: false,
    client: "Independent Project",
    date: "February 2024",
    software: ["Maya", "Arnold", "After Effects", "Premiere Pro"],
    polygons: "120,000 (main character)",
    formats: ["MP4", "MOV"],
    relatedProjects: [
      {
        slug: "cyberpunk-character",
        title: "Cyberpunk Character",
        category: "character",
      },
      {
        slug: "product-visualization",
        title: "Product Visualization",
        category: "product",
      },
    ],
  },
]

/**
 * Get all projects
 * @returns Array of all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    // Try to get projects from MDX files first
    const mdxProjects = await getAllProjectsFromMdx()
    if (mdxProjects.length > 0) {
      return mdxProjects
    }

    // Fall back to mock data if no MDX files are found
    console.log("No MDX project files found, using fallback data")
    return fallbackProjects
  } catch (error) {
    console.error("Error getting projects, using fallback data:", error)
    return fallbackProjects
  }
}

/**
 * Get a project by slug
 * @param slug The project slug
 * @returns The project or undefined if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    // Try to get project from MDX file first
    const mdxProject = await getProjectData(slug)
    if (mdxProject) {
      return mdxProject
    }

    // Fall back to mock data if MDX file is not found
    return fallbackProjects.find((project) => project.slug === slug)
  } catch (error) {
    console.error(`Error getting project for slug ${slug}, using fallback data:`, error)
    return fallbackProjects.find((project) => project.slug === slug)
  }
}

/**
 * Get all unique categories
 * @returns Array of category strings
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    // Try to get categories from MDX files first
    const mdxCategories = await getAllCategoriesFromMdx()
    if (mdxCategories.length > 0) {
      return mdxCategories
    }

    // Fall back to mock data if no MDX files are found
    const categories = new Set(fallbackProjects.map((project) => project.category))
    return Array.from(categories)
  } catch (error) {
    console.error("Error getting categories, using fallback data:", error)
    const categories = new Set(fallbackProjects.map((project) => project.category))
    return Array.from(categories)
  }
}

/**
 * Get all unique tags
 * @returns Array of tag strings
 */
export async function getAllTags(): Promise<string[]> {
  try {
    // Try to get tags from MDX files first
    const mdxTags = await getAllTagsFromMdx()
    if (mdxTags.length > 0) {
      return mdxTags
    }

    // Fall back to mock data if no MDX files are found
    const tagsSet = new Set<string>()
    fallbackProjects.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet)
  } catch (error) {
    console.error("Error getting tags, using fallback data:", error)
    const tagsSet = new Set<string>()
    fallbackProjects.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet)
  }
}

/**
 * Get projects by category
 * @param category The category to filter by
 * @returns Array of projects in the specified category
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.category === category)
}

/**
 * Get projects by tag
 * @param tag The tag to filter by
 * @returns Array of projects with the specified tag
 */
export async function getProjectsByTag(tag: string): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.tags.includes(tag))
}

/**
 * Get featured projects
 * @returns Array of featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.featured)
}
