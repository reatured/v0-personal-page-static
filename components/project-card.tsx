/**
 * 项目卡片组件
 * 以宜家说明书风格展示项目预览
 */
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  index?: number
  total?: number
}

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  return (
    <div className="border border-black p-4">
      <div className="mb-4">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={250}
          className="w-full h-auto object-cover aspect-video"
        />
      </div>

      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="font-mono text-sm mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.categories.map((category, i) => (
          <span key={i} className="border border-black px-2 py-0.5 font-mono text-xs">
            {category}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        {index !== undefined && total !== undefined ? (
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border border-black flex items-center justify-center">
              <span className="text-xs">{index + 1}</span>
            </div>
            <p className="font-mono text-xs">/{total}</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="font-mono text-xs text-gray-600">
                {tag}
                {i < Math.min(project.tags.length, 2) - 1 ? ", " : ""}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="font-mono text-xs text-gray-600">+{project.tags.length - 2}</span>
            )}
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-2 border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
        >
          <span className="font-mono text-xs">View Details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
