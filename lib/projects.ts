import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Define the projects directory
const projectsDirectory = path.join(process.cwd(), "projects")

// Define the Project type
export type Project = {
  slug: string
  title: string
  description: string
  date: string
  image: string
  categories: string[]
  tags: string[]
  content: string
  githubUrl?: string
  liveUrl?: string
}

// Get all project slugs
export function getProjectSlugs(): string[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.warn("Projects directory does not exist:", projectsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames.filter((fileName) => fileName.endsWith(".md")).map((fileName) => fileName.replace(/\.md$/, ""))
  } catch (error) {
    console.error("Error reading project slugs:", error)
    return []
  }
}

// Get all projects
export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()
  const projects = slugs.map((slug) => getProjectBySlug(slug))

  // Sort projects by date
  return projects.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// Get a single project by slug
export function getProjectBySlug(slug: string): Project {
  const fullPath = path.join(projectsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the project metadata section
  const { data, content } = matter(fileContents)

  // Ensure categories is an array
  const categories = Array.isArray(data.categories)
    ? data.categories
    : data.categories?.split(",").map((cat: string) => cat.trim()) || []

  // Ensure tags is an array
  const tags = Array.isArray(data.tags) ? data.tags : data.tags?.split(",").map((tag: string) => tag.trim()) || []

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    image: data.image || "/placeholder.svg",
    categories,
    tags,
    content,
    githubUrl: data.githubUrl || "#",
    liveUrl: data.liveUrl || "#",
  }
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getAllProjects()
  return allProjects.filter((project) => project.categories.includes(category))
}

// Get all unique categories
export function getAllCategories(): string[] {
  const projects = getAllProjects()
  const categoriesSet = new Set<string>()

  projects.forEach((project) => {
    project.categories.forEach((category) => {
      categoriesSet.add(category)
    })
  })

  return Array.from(categoriesSet)
}
