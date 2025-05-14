import { notFound } from "next/navigation"
import { ProjectShowcase } from "@/components/project-showcase"
import { getProjectsByCategory, getAllCategories } from "@/lib/projects"

// Define our categories and their display names
export const categoryDisplayNames: Record<string, string> = {
  "3d-design": "3D Design",
  "graphic-design": "Graphic Design",
  "creative-coding": "Creative Coding",
  "game-dev": "Game Dev",
  "xr-dev": "XR Dev",
  "full-stack": "Full Stack Dev",
}

// Generate static params for all categories
export function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    slug: category,
  }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Get projects for this category
  const projects = getProjectsByCategory(slug)

  // If no projects found and category is not valid, return 404
  if (projects.length === 0 && !Object.keys(categoryDisplayNames).includes(slug)) {
    notFound()
  }

  // Get display name for the category
  const categoryName = categoryDisplayNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")

  return (
    <div className="container py-6 md:py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">{categoryName} Projects</h1>
      <ProjectShowcase projects={projects} />
    </div>
  )
}
