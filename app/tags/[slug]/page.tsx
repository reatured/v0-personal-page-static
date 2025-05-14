// 确保这个页面是一个服务器组件
// Ensure this page is a server component
// 移除任何 'use client' 指令（如果有的话）
// Remove any 'use client' directive (if present)

/**
 * 标签详情页面
 */
import { getAllTags } from "@/lib/mdx"
import type { Metadata } from "next"
import TagPageClient from "./TagPageClient"

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tags = getAllTags()
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
    }
  }

  return {
    title: `${tag.name} Projects | IKEA-Style Portfolio`,
    description: `Projects using ${tag.name}`,
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()

  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

export default function TagPage({ params }: TagPageProps) {
  return <TagPageClient params={params} />
}
