/**
 * 类别展示组件
 * 以宜家说明书风格展示特定类别的项目
 */
import type { Project, Category } from "@/lib/types"
import { ProjectCard } from "./project-card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CategorySectionProps {
  category: Category
  projects: Project[]
}

export function CategorySection({ category, projects }: CategorySectionProps) {
  // 只显示该类别的前2个项目
  const displayProjects = projects.filter((project) => project.categories.includes(category.name)).slice(0, 2)

  if (displayProjects.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="border border-black p-6">
        <p className="font-mono mb-6">{category.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} total={displayProjects.length} />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href={`/categories/${category.slug}`}
            className="flex items-center gap-2 border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
          >
            <span className="font-mono">View All {category.name} Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
