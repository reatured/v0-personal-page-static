/**
 * 项目列表页面
 */
import { getAllProjects, categories, getAllTags } from "@/lib/mdx"
import type { Metadata } from "next"
import { ProjectsGrid } from "@/components/projects-grid"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Projects | IKEA-Style Portfolio",
  description: "Browse all projects in the portfolio",
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  const tags = await getAllTags()

  return (
    <main className="container mx-auto py-12 px-4 mt-10 md:mt-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">1</div>
        <h1 className="text-3xl font-bold">ALL PROJECTS</h1>
      </div>

      <ProjectsGrid projects={projects} categories={categories} tags={tags} />

      <Separator className="border-black my-12" />

      <div className="border border-black p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 border border-black flex items-center justify-center mt-1">
            <span>i</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Project Information</h2>
            <p className="font-mono">
              Browse all projects in the portfolio. Use the filters to narrow down by category or software. Click on a
              project to view detailed information and process.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
