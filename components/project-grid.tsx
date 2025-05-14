/**
 * Project Grid Component
 * Grid layout for displaying multiple projects
 */
import ProjectCard from "@/components/project-card"
import type { Project } from "@/lib/projects"

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="bg-white border-4 border-black rounded-lg p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-4">No Projects Found</h3>
        <p className="text-gray-700">
          No projects match your current filter criteria. Try adjusting your filters or check back later for new
          projects.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          title={project.title}
          subtitle={project.subtitle}
          description={project.description}
          imageUrl={project.thumbnail}
          slug={project.slug}
          category={project.category}
          index={index + 1}
        />
      ))}
    </div>
  )
}
