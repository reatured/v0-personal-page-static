/**
 * Supabase数据迁移脚本
 * 将现有的项目数据迁移到Supabase数据库
 *
 * 使用方法:
 * 1. 确保已经设置好Supabase环境变量
 * 2. 运行: npx ts-node scripts/migrate-to-supabase.ts
 *
 * 注意: 此脚本仅在服务器端运行，不会包含在客户端构建中
 */
import { createClient } from "@supabase/supabase-js"
import { fallbackProjects } from "../lib/projects"
import dotenv from "dotenv"

// 加载环境变量
dotenv.config()

// 安全地获取环境变量
const getEnvVar = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`环境变量 ${name} 未定义`)
  }
  return value
}

// 创建Supabase客户端 - 仅在脚本执行时运行，不会包含在客户端构建中
const initSupabaseForMigration = () => {
  try {
    // 仅在脚本执行时获取环境变量
    const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL")
    const supabaseKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY") // 使用service role key以获得完整权限

    return createClient(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error("错误: 无法初始化Supabase客户端", error)
    process.exit(1)
  }
}

/**
 * 迁移项目数据到Supabase
 */
async function migrateProjects() {
  console.log("开始迁移项目数据到Supabase...")

  try {
    // 仅在函数执行时初始化Supabase客户端
    const supabase = initSupabaseForMigration()

    // 检查是否已有项目数据
    const { count, error: countError } = await supabase.from("projects").select("*", { count: "exact", head: true })

    if (countError) throw countError

    if (count && count > 0) {
      console.log(`数据库中已有 ${count} 个项目。是否要继续迁移？`)
      console.log("如果要继续，请修改脚本中的 FORCE_MIGRATION 变量为 true")

      // 如果要强制迁移，将此变量设置为true
      const FORCE_MIGRATION = false

      if (!FORCE_MIGRATION) {
        console.log("迁移已取消。")
        return
      }

      console.log("继续迁移...")
    }

    // 迁移每个项目
    for (const project of fallbackProjects) {
      console.log(`正在迁移项目: ${project.title}`)

      // 1. 插入项目基本信息
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert({
          id: project.id, // 使用现有ID
          title: project.title,
          subtitle: project.subtitle,
          slug: project.slug,
          description: project.description,
          content: project.fullDescription,
          category: project.category,
          tags: project.tags,
          thumbnail_url: project.thumbnail,
          featured: project.featured,
          client: project.client,
          date: project.date,
          software: project.software,
          polygons: project.polygons,
          formats: project.formats,
        })
        .select()

      if (projectError) {
        console.error(`迁移项目 ${project.title} 时出错:`, projectError)
        continue
      }

      const projectId = project.id

      // 2. 插入项目图片
      if (project.images && project.images.length > 0) {
        for (let i = 0; i < project.images.length; i++) {
          const { error: imageError } = await supabase.from("project_images").insert({
            project_id: projectId,
            image_url: project.images[i],
            display_order: i,
          })

          if (imageError) {
            console.error(`为项目 ${project.title} 添加图片时出错:`, imageError)
          }
        }

        console.log(`已为项目 ${project.title} 添加 ${project.images.length} 张图片`)
      }

      // 3. 如果有modelUrl，将其作为视频链接添加
      if (project.modelUrl) {
        const { error: videoError } = await supabase.from("project_videos").insert({
          project_id: projectId,
          video_url: project.modelUrl,
          video_type: "youtube", // 假设为YouTube链接，根据实际情况调整
          display_order: 0,
        })

        if (videoError) {
          console.error(`为项目 ${project.title} 添加视频链接时出错:`, videoError)
        } else {
          console.log(`已为项目 ${project.title} 添加视频链接`)
        }
      }

      console.log(`项目 ${project.title} 迁移完成`)
    }

    console.log("所有项目迁移完成!")
  } catch (error) {
    console.error("迁移过程中出错:", error)
  }
}

// 仅当直接运行脚本时执行迁移
if (require.main === module) {
  migrateProjects()
}
