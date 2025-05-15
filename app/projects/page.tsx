/**
 * Projects Page Component
 * Lists all projects with filtering options
 */
import { ProjectGrid } from "@/components/project-grid"
import { ProjectFilters } from "@/components/project-filters"
import { getAllProjects, getAllCategories, getAllTags } from "@/lib/supabase"

export const metadata = {
  title: "Projects | 3D Artist Portfolio",
  description: "Browse all 3D art projects including characters, environments, and animations",
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // 从Supabase获取项目数据
  const projects = await getAllProjects()
  const categories = await getAllCategories()
  const tags = await getAllTags()

  // Get filter parameters
  const categoryFilter = searchParams.category as string | undefined
  const tagFilter = searchParams.tag as string | undefined

  // Filter projects based on search parameters
  const filteredProjects = projects.filter((project) => {
    // Filter by category if specified
    if (categoryFilter && project.category !== categoryFilter) {
      return false
    }

    // Filter by tag if specified
    if (tagFilter && !project.tags.includes(tagFilter)) {
      return false
    }

    return true
  })

  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white border-4 border-black rounded-lg p-6 mb-8 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Projects</h1>
          <p className="text-gray-700">
            Browse my complete collection of 3D art projects, including character designs, environments, product
            visualizations, and animations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProjectFilters
              categories={categories}
              tags={tags}
              selectedCategory={categoryFilter}
              selectedTag={tagFilter}
            />
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-3">
            <ProjectGrid projects={filteredProjects} />
          </div>
        </div>
      </div>
    </main>
  )
}
