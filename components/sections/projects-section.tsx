/**
 * Projects Section Component
 * Displays a grid of projects on the homepage
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SectionTitle } from "@/components/section-title"
import ProjectCard from "@/components/project-card"
import type { Project } from "@/lib/projects"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Limit to 4 projects for the homepage
  const displayProjects = projects.slice(0, 4)

  return (
    <section id="projects" className="py-20 bg-[#f5f3e4] border-t-4 border-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <SectionTitle title="PROJECTS" subtitle="Latest Work" style="collage" />
          <Button asChild className="bg-[#ffdd59] text-black hover:bg-[#ffdd59]/90 border-2 border-black font-bold">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
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
      </div>
    </section>
  )
}
