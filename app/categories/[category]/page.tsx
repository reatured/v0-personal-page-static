/**
 * Category Page Component
 * Shows projects filtered by category
 */
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ProjectGrid } from "@/components/project-grid"
import { getAllProjects, getAllCategories } from "@/lib/projects"

export async function generateStaticParams() {
  const categories = await getAllCategories()

  return categories.map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const categories = await getAllCategories()

  if (!categories.includes(params.category)) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Projects | 3D Artist Portfolio`,
    description: `Browse all ${params.category} 3D art projects in my portfolio`,
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categories = await getAllCategories()

  if (!categories.includes(params.category)) {
    notFound()
  }

  const projects = await getAllProjects()
  const filteredProjects = projects.filter((project) => project.category === params.category)

  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/projects" className="flex items-center text-sm font-bold hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Projects
          </Link>
        </div>

        <div className="bg-white border-4 border-black rounded-lg p-6 mb-8 shadow-lg">
          <div className="inline-block bg-[#ffdd59] px-3 py-1 rounded-full border-2 border-black text-sm font-bold uppercase mb-4">
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
          </h1>
          <p className="text-gray-700">
            Browse all my {params.category} projects, showcasing various styles and techniques.
          </p>
        </div>

        <ProjectGrid projects={filteredProjects} />
      </div>
    </main>
  )
}
