/**
 * Supabase客户端配置
 * 提供与Supabase数据库交互的函数
 */
import { createClient } from "@supabase/supabase-js"

// 创建Supabase客户端实例
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// 获取所有项目
export async function getAllProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      images:project_images(id, image_url, display_order),
      videos:project_videos(id, video_url, video_type, thumbnail_url, display_order)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
}

// 根据slug获取项目
export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      images:project_images(id, image_url, display_order),
      videos:project_videos(id, video_url, video_type, thumbnail_url, display_order)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching project by slug:", error)
    return null
  }

  return data
}

// 根据ID获取项目
export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      images:project_images(id, image_url, display_order),
      videos:project_videos(id, video_url, video_type, thumbnail_url, display_order)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching project by id:", error)
    return null
  }

  return data
}

// 获取所有类别
export async function getAllCategories() {
  const { data, error } = await supabase.from("projects").select("category").order("category")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  // 提取唯一类别
  const categories = [...new Set(data.map((item) => item.category))]
  return categories
}

// 获取所有标签
export async function getAllTags() {
  const { data, error } = await supabase.from("projects").select("tags")

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  // 提取所有标签并去重
  const allTags = data.flatMap((item) => item.tags || [])
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags
}

// 根据类别获取项目
export async function getProjectsByCategory(category: string) {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      images:project_images(id, image_url, display_order),
      videos:project_videos(id, video_url, video_type, thumbnail_url, display_order)
    `)
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects by category:", error)
    return []
  }

  return data || []
}

// 获取特色项目
export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      images:project_images(id, image_url, display_order),
      videos:project_videos(id, video_url, video_type, thumbnail_url, display_order)
    `)
    .eq("featured", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }

  return data || []
}
