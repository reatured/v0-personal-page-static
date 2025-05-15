import { getProjectBySlug, getAllProjects } from "@/lib/mdx"
import { markdownToHtml } from "@/lib/markdown"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import "@/app/projects.css"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | IKEA-Style Portfolio`,
    description: project.description,
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  // 将 Markdown 内容转换为 HTML
  const contentHtml = await markdownToHtml(project.content)

  return (
    <main className="container mx-auto py-12 px-4 mt-10 md:mt-0">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 border border-black px-4 py-2 mb-8 hover:bg-black hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-mono">Back to Projects</span>
      </Link>

      <div className="border border-black p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="font-mono mb-6">{project.description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold font-mono">Categories:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="border border-black px-3 py-1 font-mono text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold font-mono">Software Used:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="border border-black px-3 py-1 font-mono text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold font-mono">Date:</h3>
                <p className="font-mono text-sm">{project.date}</p>
              </div>
            </div>
          </div>

          <div className="border border-black p-4">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-auto"
              unoptimized={project.image?.startsWith("http")}
            />
          </div>
        </div>

        <Separator className="border-black mb-8" />

        <div className="prose prose-sm max-w-none font-mono">
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </main>
  )
}
