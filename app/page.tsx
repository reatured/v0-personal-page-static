/**
 * 个人作品集首页
 * 这个页面采用宜家说明书风格设计，使用简约的黑白线条图和图标来展示个人信息、技能和项目
 */
import Image from "next/image"
import Link from "next/link"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { CategorySection } from "@/components/category-section"
import { Separator } from "@/components/ui/separator"
import { getAllProjects, categories } from "@/lib/projects"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  const projects = getAllProjects()
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 标题部分 - 类似宜家说明书的标题 */}
      <header className="container mx-auto py-12 px-4 mt-10 md:mt-0">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-6xl font-black tracking-tighter">PORTFOLIO</h1>
            <p className="text-xl mt-2 font-mono">Assembly instructions for professional success</p>
          </div>
          <div className="border border-black p-4">
            <p className="font-mono text-sm">Model: DEV-2024</p>
            <p className="font-mono text-sm">Version: 1.0.0</p>
          </div>
        </div>

        <HeroSection />
      </header>

      <Separator className="border-black" />

      {/* 特色项目部分 */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">1</div>
          <h2 className="text-3xl font-bold">FEATURED PROJECTS</h2>
        </div>

        <div className="border border-black p-6">
          <p className="font-mono mb-6">Highlighted projects showcasing the best work across different categories.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.slug} className="border border-black p-4">
                <div className="mb-4">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>

                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="font-mono text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories.map((category, i) => (
                    <span key={i} className="border border-black px-2 py-0.5 font-mono text-xs">
                      {category}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-2 border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors w-full justify-center"
                >
                  <span className="font-mono">View Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/projects"
              className="flex items-center gap-2 border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              <span className="font-mono">View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Separator className="border-black" />

      {/* 类别部分 - 展示各个专业类别 */}
      {categories.map((category, index) => (
        <section key={category.slug} id={category.slug} className="container mx-auto py-12 px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">
              {index + 2}
            </div>
            <h2 className="text-3xl font-bold">{category.name.toUpperCase()}</h2>
          </div>
          <CategorySection category={category} projects={projects} />
          {index < categories.length - 1 && <Separator className="border-black mt-12" />}
        </section>
      ))}

      <Separator className="border-black" />

      {/* 技能部分 - 显示各种技能及其"数量" */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">
            {categories.length + 2}
          </div>
          <h2 className="text-3xl font-bold">SKILLS INVENTORY</h2>
        </div>
        <SkillsSection />
      </section>

      <Separator className="border-black" />

      {/* 经验部分 - 以时间线形式展示 */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">
            {categories.length + 3}
          </div>
          <h2 className="text-3xl font-bold">EXPERIENCE TIMELINE</h2>
        </div>
        <ExperienceSection />
      </section>

      <Separator className="border-black" />

      {/* 联系部分 */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">
            {categories.length + 4}
          </div>
          <h2 className="text-3xl font-bold">CONTACT INFORMATION</h2>
        </div>
        <ContactSection />
      </section>

      <footer className="container mx-auto py-8 px-4 border-t border-black">
        <p className="font-mono text-sm text-center">
          © 2024 PORTFOLIO. All rights reserved. No actual assembly required.
        </p>
      </footer>
    </main>
  )
}
