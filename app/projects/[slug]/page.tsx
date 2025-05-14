import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Eye, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProjectBySlug, getAllProjects } from "@/lib/projects"
import { ProjectGallery } from "@/components/project-gallery"
import { ModelViewer } from "@/components/model-viewer"

export async function generateStaticParams() {
  const projects = await getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | 3D Artist Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/projects" className="flex items-center text-sm font-bold hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white border-4 border-black rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Link
                  href={`/categories/${project.category}`}
                  className="bg-[#ffdd59] text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black uppercase"
                >
                  {project.category}
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">{project.title}</h1>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} className="bg-[#f5f3e4] text-black border-2 border-black">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#ffdd59] text-black hover:bg-[#ffdd59]/90 border-2 border-black font-bold">
                <Eye className="mr-2 h-4 w-4" />
                View in AR
              </Button>
              <Button variant="outline" className="border-2 border-black font-bold">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="border-2 border-black font-bold">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Gallery */}
            <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-8">
              <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">Project Gallery</h2>
              <div className="p-4">
                <ProjectGallery images={project.images} />
              </div>
            </div>

            {/* 3D Model Viewer */}
            {project.modelUrl && (
              <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-8">
                <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">3D Model Viewer</h2>
                <div className="p-4">
                  <ModelViewer modelUrl={project.modelUrl} />
                </div>
              </div>
            )}

            {/* Project Description */}
            <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg">
              <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">About This Project</h2>
              <div className="p-6 w-full">
                {project.contentHtml ? (
                  <div className="prose prose-lg max-w-none prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
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
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Project Details */}
            <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-8">
              <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">Project Details</h2>
              <div className="p-4">
                <dl className="space-y-4">
                  {project.client && (
                    <div>
                      <dt className="text-sm font-bold">Client</dt>
                      <dd>{project.client}</dd>
                    </div>
                  )}
                  {project.date && (
                    <div>
                      <dt className="text-sm font-bold">Date</dt>
                      <dd>{project.date}</dd>
                    </div>
                  )}
                  {project.software && project.software.length > 0 && (
                    <div>
                      <dt className="text-sm font-bold">Software Used</dt>
                      <dd>
                        <ul className="list-disc list-inside">
                          {project.software.map((sw) => (
                            <li key={sw}>{sw}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {project.polygons && (
                    <div>
                      <dt className="text-sm font-bold">Polygons</dt>
                      <dd>{project.polygons}</dd>
                    </div>
                  )}
                  {project.formats && project.formats.length > 0 && (
                    <div>
                      <dt className="text-sm font-bold">Formats</dt>
                      <dd>{project.formats.join(", ")}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Related Projects */}
            {project.relatedProjects && project.relatedProjects.length > 0 && (
              <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg">
                <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">Related Projects</h2>
                <div className="p-4">
                  <div className="space-y-4">
                    {project.relatedProjects.map((relatedProject) => (
                      <Link
                        key={relatedProject.slug}
                        href={`/projects/${relatedProject.slug}`}
                        className="block bg-[#f5f3e4] p-3 rounded-lg border-2 border-black hover:bg-[#ffdd59] transition-colors"
                      >
                        <div className="font-bold">{relatedProject.title}</div>
                        <div className="text-sm text-gray-700">{relatedProject.category}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
