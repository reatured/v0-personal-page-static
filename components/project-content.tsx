/**
 * Project Content Component
 * Renders the content of a project from markdown
 */
import type { Project } from "@/lib/projects"

interface ProjectContentProps {
  project: Project
}

export function ProjectContent({ project }: ProjectContentProps) {
  // If we have HTML content from markdown, use that
  if (project.contentHtml) {
    return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
  }

  // Otherwise, fall back to the structured data
  return (
    <div className="prose max-w-none">
      <p>{project.fullDescription}</p>

      {project.process && (
        <>
          <h3>Process</h3>
          <p>{project.process}</p>
        </>
      )}

      {project.challenges && (
        <>
          <h3>Challenges</h3>
          <p>{project.challenges}</p>
        </>
      )}

      {project.solutions && (
        <>
          <h3>Solutions</h3>
          <p>{project.solutions}</p>
        </>
      )}
    </div>
  )
}
