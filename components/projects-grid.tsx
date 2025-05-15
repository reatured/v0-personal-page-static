"use client"

/**
 * 项目网格组件
 * 展示项目列表并支持筛选
 */
import { useState } from "react"
import type { Project, Category, Tag } from "@/lib/types"
import { ProjectCard } from "./project-card"
import { FilterBar } from "./ui/filter-bar"

interface ProjectsGridProps {
  projects: Project[]
  categories: Category[]
  tags: Tag[]
  initialCategory?: string | null
  initialTag?: string | null
}

export function ProjectsGrid({
  projects,
  categories,
  tags,
  initialCategory = null,
  initialTag = null,
}: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag)

  // 筛选项目
  const filteredProjects = projects.filter((project) => {
    // 如果没有选择类别和标签，显示所有项目
    if (!selectedCategory && !selectedTag) return true

    // 如果选择了类别
    const matchesCategory = selectedCategory
      ? project.categories.includes(categories.find((c) => c.slug === selectedCategory)?.name || "")
      : true

    // 如果选择了标签
    const matchesTag = selectedTag ? project.tags.includes(tags.find((t) => t.slug === selectedTag)?.name || "") : true

    return matchesCategory && matchesTag
  })

  return (
    <div>
      <FilterBar
        categories={categories}
        tags={tags}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        onCategoryChange={setSelectedCategory}
        onTagChange={setSelectedTag}
      />

      {filteredProjects.length === 0 ? (
        <div className="border border-black p-8 text-center">
          <p className="font-mono">No projects match the selected filters.</p>
          <button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedTag(null)
            }}
            className="mt-4 border border-black px-4 py-2 font-mono hover:bg-black hover:text-white transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
