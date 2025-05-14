/**
 * Markdown 文件处理函数
 * 用于读取和解析项目的 Markdown 文件
 */
import fs from "fs"
import path from "path"
import matter from "gray-matter"
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

// 项目文件目录
const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

// 获取所有项目文件
export function getProjectFiles(): string[] {
  return fs.readdirSync(PROJECTS_DIR).filter((file) => file.endsWith(".md"))
}

// 解析单个项目文件
export function parseProjectFile(fileName: string): Project {
  const slug = fileName.replace(/\.md$/, "")
  const filePath = path.join(PROJECTS_DIR, fileName)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    categories: data.categories || [],
    tags: data.tags || [],
    image: data.image || `/placeholder.svg?key=${slug}`,
    content,
    featured: data.featured || false,
  }
}

// 获取所有项目
export function getAllProjects(): Project[] {
  const files = getProjectFiles()
  const projects = files.map((file) => parseProjectFile(file))

  return projects.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 获取项目详情
export function getProjectBySlug(slug: string): Project | null {
  try {
    const fileName = `${slug}.md`
    return parseProjectFile(fileName)
  } catch (error) {
    return null
  }
}

// 获取所有标签
export function getAllTags(): Tag[] {
  const projects = getAllProjects()
  const tagsSet = new Set<string>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet).map((tag) => ({
    name: tag,
    slug: tag.toLowerCase().replace(/\s+/g, "-"),
  }))
}

// 按类别获取项目
export function getProjectsByCategory(categorySlug: string): Project[] {
  const projects = getAllProjects()
  const category = categories.find((cat) => cat.slug === categorySlug)

  if (!category) return []

  return projects.filter((project) => project.categories.includes(category.name))
}

// 按标签获取项目
export function getProjectsByTag(tagSlug: string): Project[] {
  const projects = getAllProjects()
  const tag = getAllTags().find((t) => t.slug === tagSlug)

  if (!tag) return []

  return projects.filter((project) => project.tags.includes(tag.name))
}
