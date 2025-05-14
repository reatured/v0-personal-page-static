import { Sidebar } from "@/components/sidebar"
/**
 * Home Page Component
 * Main entry point for the 3D artist portfolio website
 */
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedSection } from "@/components/sections/featured-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { getAllProjects } from "@/lib/projects"

export default async function Home() {
  const projects = await getAllProjects()
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="flex min-h-screen bg-[#f5f3e4]">
      {/* 侧边栏 */}
      <Sidebar />

      <main className="flex-1 ml-[240px]">
        <HeroSection />
        <FeaturedSection projects={featuredProjects} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
    </div>
  )
}
