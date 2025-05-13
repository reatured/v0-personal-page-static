/**
 * 个人作品集首页
 * 这个页面采用宜家说明书风格设计，使用简约的黑白线条图和图标来展示个人信息、技能和项目
 */
import Image from "next/image"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* 标题部分 - 类似宜家说明书的标题 */}
      <header className="container mx-auto py-12 px-4">
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-black p-6">
            <Image
              src="/placeholder.svg?key=vme1o"
              alt="Developer illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center">
                <span>i</span>
              </div>
              <p className="font-mono">Required: 1 browser, 1 human</p>
            </div>
            <div className="flex gap-4 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="w-8 h-8 border border-black flex items-center justify-center">
                  {num}
                </div>
              ))}
            </div>
            <p className="font-mono text-sm mb-4">Estimated time: 5 minutes</p>
            <p className="font-mono">
              This portfolio showcases skills, projects, and experience in a simple, easy-to-assemble format. Follow the
              instructions carefully.
            </p>
          </div>
        </div>
      </header>

      <Separator className="border-black" />

      {/* 技能部分 - 显示各种技能及其"数量" */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">1</div>
          <h2 className="text-3xl font-bold">SKILLS INVENTORY</h2>
        </div>
        <SkillsSection />
      </section>

      <Separator className="border-black" />

      {/* 项目部分 - 以宜家说明书步骤形式展示 */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">2</div>
          <h2 className="text-3xl font-bold">PROJECT ASSEMBLY</h2>
        </div>
        <ProjectsSection />
      </section>

      <Separator className="border-black" />

      {/* 经验部分 - 以时间线形式展示 */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">3</div>
          <h2 className="text-3xl font-bold">EXPERIENCE TIMELINE</h2>
        </div>
        <ExperienceSection />
      </section>

      <Separator className="border-black" />

      {/* 联系部分 */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-2xl">4</div>
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
