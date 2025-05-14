/**
 * 标签详情页面
 */
import { getProjectsByTag, categories, getAllTags } from "@/lib/projects"
import type { Metadata } from "next"
import { ProjectsGrid } from "@/components/projects-grid"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tags = getAllTags()
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
    }
  }

  return {
    title: `${tag.name} Projects | IKEA-Style Portfolio`,
    description: `Projects using ${tag.name}`,
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()

  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

export default function TagPage({ params }: TagPageProps) {
  const tags = getAllTags()
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  const projects = getProjectsByTag(params.slug)

  return (
    <main className="container mx-auto py-12 px-4 mt-10 md:mt-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">1</div>
        <h1 className="text-3xl font-bold">PROJECTS USING {tag.name.toUpperCase()}</h1>
      </div>

      <div className="border border-black p-6 mb-8">
        <p className="font-mono">Browse all projects that use {tag.name} in their creation process.</p>
      </div>

      <ProjectsGrid projects={projects} categories={categories} tags={tags} initialTag={params.slug} />

      <Separator className="border-black my-12" />

      <div className="border border-black p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 border border-black flex items-center justify-center mt-1">
            <span>i</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Software Information</h2>
            <p className="font-mono">
              Viewing projects that use {tag.name}. Use the filters to further refine your selection.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
