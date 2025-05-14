// 确保这个页面是一个服务器组件
// Ensure this page is a server component
// 移除任何 'use client' 指令（如果有的话）
// Remove any 'use client' directive (if present)

import ProjectPageClient from "./ProjectPageClient"
import { getProjectBySlug, getAllProjects } from "@/lib/mdx"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | IKEA-Style Portfolio`,
    description: project.description,
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectPageClient params={params} />
}
