import { ProjectShowcase } from "@/components/project-showcase"
import { getAllProjects } from "@/lib/projects"

export default function Home() {
  const projects = getAllProjects()

  return (
    <div className="container py-6 md:py-12">
      <ProjectShowcase projects={projects} />
    </div>
  )
}
