/**
 * MDX Utilities
 * Functions for loading and processing MDX/Markdown content
 */
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Project } from "./projects"

// Directory where project markdown files are stored
const projectsDirectory = path.join(process.cwd(), "content/projects")

/**
 * Get all project slugs from markdown files
 */
export async function getAllProjectSlugs() {
  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames.map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ""),
        },
      }
    })
  } catch (error) {
    console.error("Error reading project directory:", error)
    return []
  }
}

/**
 * Get project data from markdown file
 */
export async function getProjectData(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)

    const contentHtml = processedContent.toString()

    // Combine the data with the slug and HTML content
    return {
      id: slug,
      slug,
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      description: matterResult.data.description,
      fullDescription: matterResult.data.fullDescription || contentHtml,
      process: matterResult.data.process || "",
      challenges: matterResult.data.challenges || "",
      solutions: matterResult.data.solutions || "",
      category: matterResult.data.category,
      tags: matterResult.data.tags || [],
      thumbnail: matterResult.data.thumbnail,
      images: matterResult.data.images || [],
      modelUrl: matterResult.data.modelUrl || "",
      featured: matterResult.data.featured || false,
      client: matterResult.data.client || "",
      date: matterResult.data.date || "",
      software: matterResult.data.software || [],
      polygons: matterResult.data.polygons || "",
      formats: matterResult.data.formats || [],
      relatedProjects: matterResult.data.relatedProjects || [],
      contentHtml,
    }
  } catch (error) {
    console.error(`Error reading project file for slug ${slug}:`, error)
    return null
  }
}

/**
 * Get all projects from markdown files
 */
export async function getAllProjectsFromMdx(): Promise<Project[]> {
  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    const allProjectsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const projectData = await getProjectData(slug)
        return projectData
      }),
    )

    // Filter out any null values and sort by date
    return allProjectsData
      .filter((project): project is Project => project !== null)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  } catch (error) {
    console.error("Error getting all projects:", error)
    return []
  }
}

/**
 * Get all categories from markdown files
 */
export async function getAllCategoriesFromMdx(): Promise<string[]> {
  const projects = await getAllProjectsFromMdx()
  const categories = new Set(projects.map((project) => project.category))
  return Array.from(categories)
}

/**
 * Get all tags from markdown files
 */
export async function getAllTagsFromMdx(): Promise<string[]> {
  const projects = await getAllProjectsFromMdx()
  const tagsSet = new Set<string>()
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet)
}
