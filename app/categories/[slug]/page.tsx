/**
 * 类别详情页面
 */
import { getProjectsByCategory, categories, getAllTags } from "@/lib/mdx"
import type { Metadata } from "next"
import { ProjectsGrid } from "@/components/projects-grid"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} Projects | IKEA-Style Portfolio`,
    description: category.description,
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const projects = await getProjectsByCategory(params.slug)
  const tags = await getAllTags()

  return (
    <main className="container mx-auto py-12 px-4 mt-10 md:mt-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">1</div>
        <h1 className="text-3xl font-bold">{category.name.toUpperCase()} PROJECTS</h1>
      </div>

      <div className="border border-black p-6 mb-8">
        <p className="font-mono">{category.description}</p>
      </div>

      <ProjectsGrid projects={projects} categories={categories} tags={tags} initialCategory={params.slug} />

      <Separator className="border-black my-12" />

      <div className="border border-black p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 border border-black flex items-center justify-center mt-1">
            <span>i</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Category Information</h2>
            <p className="font-mono">
              Viewing projects in the {category.name} category. Use the filters to further refine your selection.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
