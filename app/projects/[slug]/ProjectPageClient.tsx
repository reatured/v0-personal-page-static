"use client"

import type React from "react"

/**
 * 项目详情页面
 */
import { getProjectBySlug } from "@/lib/mdx"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import "@/app/projects.css"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// 将Markdown转换为格式化的HTML文本
// Convert Markdown to formatted HTML text
function formatMarkdown(markdown: string): React.ReactNode {
  if (!markdown) return null

  // 处理标题 (Handle headings)
  let formatted = markdown.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
  formatted = formatted.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
  formatted = formatted.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')

  // 处理列表 (Handle lists)
  formatted = formatted.replace(/^\s*[-*+]\s(.*$)/gm, '<li class="ml-4">$1</li>')
  formatted = formatted.replace(/(<li.*\n<li)/gm, "$1")
  formatted = formatted.replace(/(<li.*(?:\n|$))+/gm, '<ul class="list-disc my-4 pl-5">$&</ul>')

  // 处理粗体和斜体 (Handle bold and italic)
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>")

  // 处理链接 (Handle links)
  formatted = formatted.replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')

  // 处理段落 (Handle paragraphs)
  formatted = formatted.replace(/^(?!<[hua]).+/gm, '<p class="my-2">$&</p>')

  // 保留图片和HTML标签 (Preserve images and HTML tags)
  formatted = formatted.replace(/<div class="image-grid[^>]*>([\s\S]*?)<\/div>/g, (match) => match)

  // 处理换行 (Handle line breaks)
  formatted = formatted.replace(/\n\n/g, "<br/>")

  return <div dangerouslySetInnerHTML={{ __html: formatted }} />
}

export default function ProjectPageClient({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="container mx-auto py-12 px-4 mt-10 md:mt-0">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 border border-black px-4 py-2 mb-8 hover:bg-black hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-mono">Back to Projects</span>
      </Link>

      <div className="border border-black p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="font-mono mb-6">{project.description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold font-mono">Categories:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="border border-black px-3 py-1 font-mono text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold font-mono">Software Used:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="border border-black px-3 py-1 font-mono text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold font-mono">Date:</h3>
                <p className="font-mono text-sm">{project.date}</p>
              </div>
            </div>
          </div>

          <div className="border border-black p-4">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-auto"
              unoptimized={project.image?.startsWith("http")}
            />
          </div>
        </div>

        <Separator className="border-black mb-8" />

        <div className="prose prose-sm max-w-none font-mono">
          <div className="markdown-content">{formatMarkdown(project.content)}</div>
        </div>
      </div>
    </main>
  )
}
