/**
 * Featured Section Component
 * Showcases featured projects on the homepage
 */
import { ProjectShowcase } from "@/components/project-showcase"
import { SectionTitle } from "@/components/section-title"

// 更新项目类型以匹配Supabase数据结构
interface ProjectImage {
  id: string
  image_url: string
  display_order: number
}

interface Project {
  id: string
  title: string
  subtitle: string
  slug: string
  description: string
  category: string
  tags: string[]
  thumbnail_url: string
  featured: boolean
  client: string | null
  date: string | null
  software: string[]
  polygons: string | null
  formats: string[]
  images?: ProjectImage[]
  content?: string | null
}

interface FeaturedSectionProps {
  projects: Project[]
}

export function FeaturedSection({ projects }: FeaturedSectionProps) {
  // Use the first featured project for the showcase
  const featuredProject = projects[0]

  return (
    <section className="py-20 bg-white border-t-4 border-black">
      <div className="container mx-auto px-4">
        <SectionTitle title="FEATURED" subtitle="Featured Projects" style="collage" />
        <div className="mt-16">{featuredProject && <ProjectShowcase project={featuredProject} />}</div>
      </div>
    </section>
  )
}
