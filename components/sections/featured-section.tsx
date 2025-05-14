/**
 * Featured Section Component
 * Showcases featured projects on the homepage
 */
import { ProjectShowcase } from "@/components/project-showcase"
import { SectionTitle } from "@/components/section-title"
import type { Project } from "@/lib/projects"

interface FeaturedSectionProps {
  projects: Project[]
}

export function FeaturedSection({ projects }: FeaturedSectionProps) {
  // Use the first featured project for the showcase
  const featuredProject = projects[0]

  return (
    <section className="py-20 bg-white border-t-4 border-black">
      <div className="container mx-auto px-4">
        <SectionTitle title="FEATURED" subtitle="Featured Projects" style="collage" />
        <div className="mt-16">{featuredProject && <ProjectShowcase project={featuredProject} />}</div>
      </div>
    </section>
  )
}
